package com.dron.edusynthserver.quiz.service.impl;

import com.dron.edusynthserver.exceptions.BadAnswerFormat;
import com.dron.edusynthserver.exceptions.BadNameException;
import com.dron.edusynthserver.exceptions.NotFoundException;
import com.dron.edusynthserver.exceptions.SessionNotFound;
import com.dron.edusynthserver.quiz.Mapper.ParticipantMapper;
import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.dto.SessionResultDto;
import com.dron.edusynthserver.quiz.dto.SessionStateDto;
import com.dron.edusynthserver.quiz.model.*;
import com.dron.edusynthserver.quiz.repository.AnswersRepository;
import com.dron.edusynthserver.quiz.repository.ParticipantRepository;
import com.dron.edusynthserver.quiz.repository.SessionRepository;
import com.dron.edusynthserver.quiz.service.QuizService;
import com.dron.edusynthserver.quiz.service.SessionService;
import com.dron.edusynthserver.security.JwtTokenProvider;
import com.dron.edusynthserver.user.dto.ParticipantResultDto;
import com.dron.edusynthserver.user.model.Role;
import com.dron.edusynthserver.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SessionServiceImpl implements SessionService {

    SessionRepository sessionRepository;
    ParticipantRepository participantRepository;
    AnswersRepository answersRepository;
    ParticipantMapper participantMapper;
    JwtTokenProvider jwtTokenProvider;
    QuizService quizService;
    private static final int CODE_LENGTH = 4;
    private static final int RADIX = 26;
    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository, ParticipantRepository participantRepository, AnswersRepository answersRepository, ParticipantMapper participantMapper, JwtTokenProvider jwtTokenProvider, QuizService quizService) {
        this.sessionRepository = sessionRepository;
        this.participantRepository = participantRepository;
        this.answersRepository = answersRepository;
        this.participantMapper = participantMapper;
        this.jwtTokenProvider = jwtTokenProvider;
        this.quizService = quizService;
    }

    @Override
    public SessionStateDto getSessionState(String sessionCode) {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        if (currentSession == null) {
            throw new SessionNotFound();
        }

        CurrentQuestionState currentQuestionState = getCurrentQuestionIndex(
                currentSession.getStartTime(),
                currentSession.getQuiz().getQuestions());

        SessionStateDto sessionStateDto = SessionStateDto.builder()
                .timeRemainingToNextQuestionSec(currentQuestionState.getTimeRemaining())
                .currentQuestionId(currentQuestionState.getId())
                .doesSessionHasEnded(currentQuestionState.getId() != -1)
                .build();

        return sessionStateDto;
    }

    @Override
    public ParticipantDto joinSession(String sessionCode, User user) {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        Participant participant = Participant.builder()
                .session(currentSession)
                .isLeader(false)
                .user(user).build();
        participantRepository.save(participant);

        ParticipantDto participantDto = participantMapper.toDto(participant);
        participantDto.setToken(jwtTokenProvider.createToken(user));

        return participantDto;
    }


    @Override
    public ParticipantDto createSession(int QuizId, User user) {
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

        ParticipantDto participantDto = participantMapper.toDto(participant);
        participantDto.setToken(jwtTokenProvider.createToken(user));

        return participantDto;
    }

    @Override
    public ParticipantDto joinSessionAsGuest(String sessionCode, String name) throws BadNameException {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        if(currentSession.getParticipants().stream().anyMatch(user -> user.getUser().getUsername().equals(name)))
            throw new BadNameException();

        User mockUser = User.builder()
                .username(name)
                .role(Role.STUDENT_TEMP)
                .email("")
                .password("")
                .build();

        Participant participant = Participant.builder()
                .session(currentSession)
                .isLeader(false)
                .user(mockUser).build();

        participantRepository.save(participant);
        ParticipantDto participantDto = participantMapper.toDto(participant);
        participantDto.setToken(jwtTokenProvider.createToken(mockUser));

        return participantDto;
    }

    @Override
    public ParticipantDto getParticipant(String sessionCode, String name) throws NotFoundException {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);
        Optional<Participant> participant = currentSession.getParticipants().stream().filter(user -> user.getUser().getUsername().equals(name)).findFirst();
        if(participant.isEmpty()) throw new NotFoundException();

        return participantMapper.toDto(participant.get());
    }

    @Override
    public void answerQuestion(ParticipantDto participantDto, List<Integer> answersIds) {
        Optional<Participant> participantOpt = participantRepository.findParticipantByUser_Username(participantDto.name);

        if(participantOpt.isEmpty()) throw new BadNameException();

        Participant participant = participantOpt.get();

        List<Answer> selectedAnswers = answersRepository.findAllById(answersIds);
        Question question = selectedAnswers.get(0).getQuestion();

        boolean allAnswersForSameQuestion = answersRepository.findAllById(answersIds)
                .stream()
                .allMatch(answer -> answer.getQuestion().equals(question));

        if (!allAnswersForSameQuestion) {
            throw new BadAnswerFormat();
        }

        List<Answer> currentAnswers = participant.getParticipantAnswers();

        currentAnswers.removeIf(answer -> answer.getQuestion().equals(question));

        currentAnswers.addAll(selectedAnswers);

        participant.setParticipantAnswers(currentAnswers);

        /*for (Answer answer : selectedAnswers) {
            answer.getParticipants().add(participant);
        }*/

        participantRepository.save(participant);
        //answersRepository.saveAll(selectedAnswers);
    }

    @Override
    public SessionResultDto getSessionResult(String sessionCode) {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        List<Question> questions = currentSession.getQuiz().getQuestions();
        List<Participant> participants = currentSession.getParticipants();
        List<ParticipantResultDto> participantResults = new ArrayList<>();

        for (Participant participant : participants) {
            int correctAnswersCount = 0;
            for (Question question : questions) {
                    if (areAnswersCorrect(question, participant.getParticipantAnswers())) {
                        correctAnswersCount++;
                    }
                    break;
            }
            ParticipantResultDto participantResult = new ParticipantResultDto(participant.getId(), correctAnswersCount);
            participantResults.add(participantResult);
        }

        return new SessionResultDto(participantResults);
    }

    private boolean areAnswersCorrect(Question question, List<Answer> participantAnswer) {
        List<Answer> participantAnswers = participantAnswer
                .stream()
                .filter(answer -> answer.getQuestion().equals(question))
                .toList();

        if (question.getType() == QuestionType.choose_mult_options) {
            List<Answer> correctAnswers = question.getAnswers()
                    .stream()
                    .filter(Answer::isCorrect)
                    .toList();

            return new HashSet<>(correctAnswers).containsAll(participantAnswer) && new HashSet<>(participantAnswer).containsAll(correctAnswers);
        } else {
            return participantAnswers.get(0).isCorrect();
        }
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

    private CurrentQuestionState getCurrentQuestionIndex(Date sessionStartDate, List<Question> questions) {
        Date currentTime = new Date();
        long elapsedTimeInSeconds = (currentTime.getTime() - sessionStartDate.getTime()) / 1000;

        int totalElapsedTime = 0;
        for (int i = 0; i < questions.size(); i++) {
            totalElapsedTime += questions.get(i).getTimeLimitSeconds();
            if (elapsedTimeInSeconds < totalElapsedTime) {
                return new CurrentQuestionState(i, (int) (totalElapsedTime - elapsedTimeInSeconds));  // Текущий вопрос
            }
        }

        return  new CurrentQuestionState(-1, 0);  // Все вопросы закончились
    }

}
