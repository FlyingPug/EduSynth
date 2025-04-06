package com.dron.edusynthserver.Session.Service;

import com.dron.edusynthserver.Exceptions.*;
import com.dron.edusynthserver.Quiz.Repository.QuizRepository;
import com.dron.edusynthserver.Quiz.Model.*;
import com.dron.edusynthserver.Session.Mapper.SessionMapper;
import com.dron.edusynthserver.Session.Dto.SessionStateDto;
import com.dron.edusynthserver.Session.Mapper.TimerEvent;
import com.dron.edusynthserver.Session.Model.SessionStatus;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import com.dron.edusynthserver.Session.Repository.SessionRepository;
import com.dron.edusynthserver.Session.Model.Participant;
import com.dron.edusynthserver.Session.Model.Session;
import com.dron.edusynthserver.User.Model.User;
import com.dron.edusynthserver.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class SessionServiceImpl implements SessionService {
    private static final String SESSION_CACHE_PREFIX = "session:";

    private final SessionRepository sessionRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final RabbitTemplate rabbitTemplate;
    private final RedisTemplate<String, SessionStatus> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;
    private final SessionMapper sessionMapper;

    @Override
    public Session createSession(Integer quizId, Integer userId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new NotFoundException("Quiz not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Session session = Session.builder()
                .id(generateSessionCode())
                .quiz(quiz)
                .status(SessionStatus.WAITING)
                .currentQuestionIndex(0)
                .build();

        Participant leader = Participant.builder()
                .user(user)
                .isLeader(true)
                .score(0)
                .build();

        session.addParticipant(leader);
        return sessionRepository.save(session);
    }

    @Override
    public Session startSession(String sessionId,Integer userId) {
        Session session = sessionRepository.findSessionById(sessionId)
                .orElseThrow(() -> new NotFoundException("Session not found"));

        if (session.getStatus() != SessionStatus.WAITING) {
            throw new IllegalStateException("Session already started");
        }

        if (!isLeader(session, userId)) {
            throw new ForbiddenException("Only leader can start session");
        }

        session.start();
        session = sessionRepository.save(session);

        scheduleQuestionTimer(session);
        broadcastSessionState(session);

        return session;
    }

    @Override
    public Session joinSession(String sessionId, Integer userId) {
        Session session = sessionRepository.findSessionById(sessionId)
                .orElseThrow(() -> new NotFoundException("Session not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (session.getParticipants().stream().anyMatch(p -> p.getUser().equals(user))) {
            throw new ForbiddenException("User already joined");
        }

        Participant participant = Participant.builder()
                .user(user)
                .isLeader(false)
                .score(0)
                .build();

        session.addParticipant(participant);
        session = sessionRepository.save(session);

        broadcastSessionState(session);
        return session;
    }

    @Override
    public void processAnswer(String sessionCode, Integer userId, List<ParticipantAnswer> answers) {
        Session session = sessionRepository.findSessionById(sessionCode)
                .orElseThrow(() -> new NotFoundException("Session not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Participant participant = session.getParticipants().stream()
                .filter(p -> p.getUser().equals(user))
                .findFirst()
                .orElseThrow(() -> new ForbiddenException("User not in session"));

        if (session.getCurrentQuestion().isAnswerCorrect(answers)) {
            participant.incrementScore();
        }

        participant.getAnswers().addAll(answers);
        sessionRepository.save(session);

        broadcastSessionState(session);
    }

    @Override
    @Cacheable(value = "sessionStates", key = "#sessionId")
    public Session findSessionByCode(String sessionId) {
        return sessionRepository.findSessionById(sessionId)
                .orElseThrow(() -> new NotFoundException("Session not found"));
    }

    private void scheduleQuestionTimer(Session session) {
        TimerEvent event = new TimerEvent(
                session.getId(),
                session.getCurrentQuestionIndex()
        );

        long ttlMillis = session.getCurrentQuestion().getTimeLimitSeconds() * 1000;

        rabbitTemplate.convertAndSend(
                "session.exchange",
                "session.timer.wait",
                event,
                message -> {
                    message.getMessageProperties().setExpiration(String.valueOf(ttlMillis));
                    return message;
                }
        );
    }


    private void broadcastSessionState(Session session) {
        SessionStateDto state = sessionMapper.toSessionStateDto(session);

        redisTemplate.opsForValue().set(
                SESSION_CACHE_PREFIX + session.getId(),
                state.getStatus(),
                Duration.ofSeconds(session.getQuestionTimeLimit().getSeconds())
        );

        messagingTemplate.convertAndSend(
                "/topic/sessions/" + session.getId() + "/state",
                state
        );
    }

    @RabbitListener(queues = "session.timer.events")
    public void handleTimerEvent(TimerEvent event) {
        Session session = sessionRepository.findSessionById(event.getSessionId())
                .orElseThrow(() -> new NotFoundException("Session not found"));

        if (event.getCurrentQuestionIndex() == session.getCurrentQuestionIndex()) {
            session.moveToNextQuestion();
            sessionRepository.save(session);

            if (session.getStatus() == SessionStatus.ACTIVE) {
                scheduleQuestionTimer(session);
            }

            broadcastSessionState(session);
        }
    }

    private boolean isLeader(Session session, int userId) {
        return session.getParticipants().stream()
                .anyMatch(p -> p.isLeader() && (p.getUser().getId() == userId));
    }

    private String generateSessionCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}