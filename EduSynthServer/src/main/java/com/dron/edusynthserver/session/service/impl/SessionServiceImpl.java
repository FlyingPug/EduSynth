package com.dron.edusynthserver.session.service.impl;

import com.dron.edusynthserver.exceptions.*;
import com.dron.edusynthserver.session.dto.*;
import com.dron.edusynthserver.session.mapper.ParticipantMapper;
import com.dron.edusynthserver.quiz.model.*;
import com.dron.edusynthserver.quiz.repository.AnswersRepository;
import com.dron.edusynthserver.session.mapper.SessionMapper;
import com.dron.edusynthserver.session.model.SessionState;
import com.dron.edusynthserver.session.repository.ParticipantRepository;
import com.dron.edusynthserver.session.repository.SessionRepository;
import com.dron.edusynthserver.quiz.service.QuizService;
import com.dron.edusynthserver.session.service.QuestionHandler;
import com.dron.edusynthserver.session.service.SessionService;
import com.dron.edusynthserver.security.JwtTokenProvider;
import com.dron.edusynthserver.session.model.CurrentQuestionState;
import com.dron.edusynthserver.session.model.Participant;
import com.dron.edusynthserver.session.model.Session;
import com.dron.edusynthserver.user.dto.ParticipantResultDto;
import com.dron.edusynthserver.user.model.User;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SessionServiceImpl implements SessionService {

    SessionRepository sessionRepository;
    ParticipantRepository participantRepository;
    AnswersRepository answersRepository;
    ParticipantMapper participantMapper;
    SessionMapper sessionMapper;
    JwtTokenProvider jwtTokenProvider;
    QuizService quizService;
    UserService userService;
    private static final int CODE_LENGTH = 4;
    private static final int RADIX = 26;
    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // приколы будем делать, можно будем потом уйти от этого
    private final SimpMessagingTemplate messagingTemplate;

    private final Hashtable<QuestionType, QuestionHandler> QuestionHandlers;

    // TODO: инъекции зависимостей go brrrrrr, исправь это, не оставляй так много зависимостей, это громадный красный флаг
    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository,
                              ParticipantRepository participantRepository,
                              AnswersRepository answersRepository,
                              ParticipantMapper participantMapper,
                              JwtTokenProvider jwtTokenProvider,
                              QuizService quizService,
                              SessionMapper sessionMapper,
                              UserService userService, SimpMessagingTemplate messagingTemplate) {
        this.sessionRepository = sessionRepository;
        this.participantRepository = participantRepository;
        this.answersRepository = answersRepository;
        this.participantMapper = participantMapper;
        this.jwtTokenProvider = jwtTokenProvider;
        this.quizService = quizService;
        this.sessionMapper = sessionMapper;
        this.userService = userService;
        this.messagingTemplate = messagingTemplate; // уберешь потом

        QuestionHandlers = new Hashtable<>();
        QuestionHandlers.put(QuestionType.choose_option, new QuestionHandlerSingleOption());
        QuestionHandlers.put(QuestionType.choose_mult_options, new QuestionHandleMultipleOptions());
        QuestionHandlers.put(QuestionType.input_text, new QuestionHandlerInputOption());
    }

    @Override
    public SessionStateDto getSessionState(String sessionCode) {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        if (currentSession == null) {
            throw new SessionNotFound();
        }

        List<Question> questions = currentSession.getQuiz().getQuestions();

        Date currentTime = new Date();
        long elapsedTimeInSeconds = (currentTime.getTime() - currentSession.getStartTime().getTime()) / 1000;
        long timeLimit = questions.get(currentSession.getCurrentQuestionIndex()).getTimeLimitSeconds();
        if(elapsedTimeInSeconds > timeLimit)
        {
            goToNextQuestion(currentSession);
            elapsedTimeInSeconds = (currentTime.getTime() - currentSession.getStartTime().getTime()) / 1000;
            timeLimit = questions.get(currentSession.getCurrentQuestionIndex()).getTimeLimitSeconds();
        }

        return SessionStateDto.builder()
                .timeRemainingToNextQuestionSec((int) (timeLimit - elapsedTimeInSeconds))
                .currentQuestionId(currentSession.getCurrentQuestionIndex())
                .sessionState(currentSession.getSessionState())
                .participantDtoList(participantMapper.toDtoList(currentSession.getParticipants()))
                .build();
    }

    private void sendSessionState(SessionStateDto sessionStateDto, String sessionCode)
    {
        messagingTemplate.convertAndSend("/topic/session/" + sessionCode, sessionStateDto);
    }

    public void sendSessionState(String sessionCode)
    {
        messagingTemplate.convertAndSend("/topic/session/" + sessionCode, getSessionState(sessionCode));
    }


    @Override
    public SessionDto joinSession(String sessionCode, User user) {
        Session currentSession = sessionRepository.getSessionBySessionCode(sessionCode);

        Participant participant = Participant.builder()
                .session(currentSession)
                .isLeader(false)
                .user(user).build();
        participantRepository.save(participant);
        currentSession.AddParticipant(participant);

        SessionDto sessionDto = sessionMapper.toDto(currentSession);
        sessionDto.setParticipantToken(jwtTokenProvider.createToken(user));

        sendSessionState(sessionCode);

        return sessionDto;
    }


    @Override
    public SessionDto createSession(int QuizId, User user) {
        Quiz quiz = quizService.getQuizById(QuizId);
        Session newSession = Session.builder()
                .sessionCode(generateSessionCode((int) sessionRepository.count()))
                .quiz(quiz)
                .sessionState(SessionState.WAITING)
                .startTime(new Date())
                .currentQuestionIndex(0)
                .participants(new ArrayList<>())
                .build();

        Participant participant = Participant.builder()
                .session(newSession)
                .isLeader(true)
                .user(user).build();

        newSession.getParticipants().add(participant);

        newSession = sessionRepository.save(newSession);


        SessionDto sessionDto = sessionMapper.toDto(newSession);
        sessionDto.setParticipantToken(jwtTokenProvider.createToken(user));

        return sessionDto;
    }

    @Override
    public void startSession(String sessionCode, User user) {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        if (currentSession == null) {
            throw new SessionNotFound();
        }

        if (currentSession.getSessionState() != SessionState.WAITING) throw new IncorrectSessionState("Сессия уже началась");

        Optional<Participant> participant = currentSession.getParticipants().stream().filter(otherUser -> otherUser.getUser().equals(user)).findFirst();
        if(participant.isEmpty() || !participant.get().isLeader())
            throw new Forbidden();

        currentSession.setSessionState(SessionState.STARTED);
        currentSession.setStartTime(new Date());
        currentSession.setCurrentQuestionIndex(0);

        sessionRepository.save(currentSession);

        sendSessionState(sessionCode);
    }

    @Override
    public SessionDto joinSessionAsGuest(String sessionCode, String name) throws BadNameException {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);

        if(currentSession == null)
        {
            throw new SessionNotFound();
        }

        if(currentSession.getParticipants().stream().anyMatch(user -> user.getUser().getUsername().equals(name)))
            throw new BadNameException();

        // TODO: тоже какая-то хуйня, получается на каждого участника мы создаем еще и его временный профиль,
        // тогда эту херь еще нужно будет и чистить, временный профиль нам нужен только чтобы authentification
        // не жаловался, а из него он по сути просто имя брать будет, крч, скорее вего нужно менять секьюрити,
        // чтобы тот не тригерился если роль временная
        User mockUser = userService.createTemporaryUser(name);

        Participant participant = Participant.builder()
                .session(currentSession)
                .isLeader(false)
                .user(mockUser).build();
        participantRepository.save(participant);
        SessionDto sessionDto = sessionMapper.toDto(currentSession);
        sessionDto.setParticipantToken(jwtTokenProvider.createToken(mockUser));

        sendSessionState(sessionCode);

        return sessionDto;
    }

    @Override
    public ParticipantDto getParticipant(String sessionCode, String name) throws NotFoundException {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);
        Optional<Participant> participant = currentSession.getParticipants().stream().filter(user -> user.getUser().getUsername().equals(name)).findFirst();
        if(participant.isEmpty()) throw new NotFoundException();

        return participantMapper.toDto(participant.get());
    }

    @Override
    public void answerQuestion(String sessionCode, List<UserAnswerDto> answers, User user) {
        if (answers.isEmpty()) return;

        Session currentSession = sessionRepository.findBySessionCode(sessionCode);
        Optional<Participant> participantOpt = currentSession.getParticipants().stream().filter(part -> part.getUser().equals(user)).findFirst();

        if(participantOpt.isEmpty()) throw new BadNameException();

        Participant participant = participantOpt.get();

        // Получаем вопрос из первого ответа, предполагая, что все ответы относятся к одному вопросу
        List<Answer> selectedAnswers = answersRepository.findAllById(answers.stream().map(UserAnswerDto::getAnswerId).toList());
        Question question = selectedAnswers.get(0).getQuestion();

        // Проверяем, что все ответы относятся к одному вопросу
        boolean allAnswersForSameQuestion = selectedAnswers.stream()
                .allMatch(answer -> answer.getQuestion().equals(question));

        if (!allAnswersForSameQuestion) {
            throw new BadAnswerFormat("не все ответы относятся к одному вопросу");
        }

        // Получаем текущие ответы участника и удаляем ответы на текущий вопрос (чтобы у нас не было дублей)
        List<Answer> currentAnswers = participant.getParticipantAnswers();
        currentAnswers.removeIf(answer -> answer.getQuestion().equals(question));

        // Добавляем выбранные ответы в список текущих ответов участника
        currentAnswers.addAll(selectedAnswers);

        // Обновляем список ответов участника
        participant.setParticipantAnswers(currentAnswers);

        // Используем соответствующий QuestionHandler для проверки корректности ответов
        QuestionHandler questionHandler = QuestionHandlers.get(question.getType());
        if (questionHandler == null) {
            throw new UnsupportedQuestionTypeException("Не поддерживаемый тип вопроса: " + question.getType());
        }
        boolean isCorrect = questionHandler.isAnswerCorrect(answers, selectedAnswers);

        // Обновляем счет участника
        if(isCorrect) participant.setScore(participant.getScore() + 1);

        // все участники ответили на вопрос?
        if(currentSession.getParticipants().stream().allMatch
                (participant1 -> participant1.getParticipantAnswers().stream().anyMatch(
                answer -> answer.getQuestion().equals(question))))
        {
            goToNextQuestion(currentSession);
        }

        sendSessionState(sessionCode);

        // Сохраняем обновленного участника
        participantRepository.save(participant);
    }

    @Override
    public SessionResultDto getSessionResult(String sessionCode) {
        Session currentSession = sessionRepository.findBySessionCode(sessionCode);
        List<Participant> participants = currentSession.getParticipants();

        return new SessionResultDto(participantMapper.toDtoList(participants));
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

    private void goToNextQuestion(Session session)
    {
        int currentQuestionIndex = session.getCurrentQuestionIndex();;
        if (currentQuestionIndex == session.getQuiz().getQuestions().size() - 1)
        {
           session.setSessionState(SessionState.ENDED);
        }
        else
        {
            session.setCurrentQuestionIndex(currentQuestionIndex + 1);
            session.setStartTime(new Date());
        }

        sessionRepository.save(session);
    }
}
