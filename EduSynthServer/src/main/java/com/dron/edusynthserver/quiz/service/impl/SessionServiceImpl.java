package com.dron.edusynthserver.quiz.service.impl;

import com.dron.edusynthserver.exceptions.BadNameException;
import com.dron.edusynthserver.exceptions.NotFoundException;
import com.dron.edusynthserver.quiz.Mapper.ParticipantMapper;
import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.dto.SessionResultDto;
import com.dron.edusynthserver.quiz.dto.SessionStateDto;
import com.dron.edusynthserver.quiz.model.Participant;
import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.quiz.model.Session;
import com.dron.edusynthserver.quiz.repository.ParticipantRepository;
import com.dron.edusynthserver.quiz.repository.SessionRepository;
import com.dron.edusynthserver.quiz.service.QuizService;
import com.dron.edusynthserver.quiz.service.SessionService;
import com.dron.edusynthserver.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SessionServiceImpl implements SessionService {

    SessionRepository sessionRepository;
    ParticipantRepository participantRepository;
    ParticipantMapper participantMapper;
    QuizService quizService;
    private static final int CODE_LENGTH = 4;
    private static final int RADIX = 26;
    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository, ParticipantRepository participantRepository, ParticipantMapper participantMapper) {
        this.sessionRepository = sessionRepository;
        this.participantRepository = participantRepository;
        this.participantMapper = participantMapper;
    }

    @Override
    public SessionStateDto getSessionState(String sessionCode) {
        return null;
    }

    @Override
    public ParticipantDto joinSession(String sessionCode, User user) {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        Participant participant = Participant.builder()
                .session(currentSession)
                .isLeader(false)
                .user(user).build();
        participantRepository.save(participant);

        return participantMapper.toDto(participant);
    }


    @Override
    public ParticipantDto createSession(int QuizId, User user)
    {
        Quiz quiz = quizService.getQuizById(QuizId);
        Session newSession = Session.builder()
                .sessionCode(generateSessionCode((int) sessionRepository.count()))
                .quiz(quiz)
                .startTime(new Date())
                .build();

        Participant participant = Participant.builder()
                .session(newSession)
                .isLeader(true)
                .user(user).build();

        participantRepository.save(participant);
        sessionRepository.save(newSession);

        return participantMapper.toDto(participant);
    }

    @Override
    public ParticipantDto joinSessionAsGuest(String sessionCode, String name) throws BadNameException {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        if(currentSession.getParticipants().stream().anyMatch(user -> user.getUser().getUsername().equals(name)))
            throw new BadNameException();

        User mockUser = User.builder()
                .username(name)
                .build();

        Participant participant = Participant.builder()
                .session(currentSession)
                .isLeader(false)
                .user(mockUser).build();

        participantRepository.save(participant);

        return participantMapper.toDto(participant);
    }

    @Override
    public ParticipantDto getParticipant(String sessionCode, String name) throws NotFoundException {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);
        Optional<Participant> participant = currentSession.getParticipants().stream().filter(user -> user.getUser().getUsername().equals(name)).findFirst();
        if(participant.isEmpty()) throw new NotFoundException();

        return participantMapper.toDto(participant.get());
    }

    @Override
    public void answerQuestion(ParticipantDto participant, List<Long> answers)
    {
        /* TODO: определяется текущий вопрос, для этого мы определяем квиз участника,
        после этого происходит */
    }

    @Override
    public SessionResultDto getSessionResult(ParticipantDto participant) {
        return null;
    }

    public static String generateSessionCode(int id) {
        StringBuilder codeBuilder = new StringBuilder();

        // Переводим id в 26-ричную систему счисления
        while (id > 0) {
            int remainder = id % RADIX;
            codeBuilder.insert(0, ALPHABET.charAt(remainder));
            id /= RADIX;
        }

        // Дополняем код нулями в начале, если необходимо
        while (codeBuilder.length() < CODE_LENGTH) {
            codeBuilder.insert(0, 'A');
        }

        // Ограничиваем длину кода
        if (codeBuilder.length() > CODE_LENGTH) {
            codeBuilder.delete(0, codeBuilder.length() - CODE_LENGTH);
        }

        return codeBuilder.toString();
    }
}
