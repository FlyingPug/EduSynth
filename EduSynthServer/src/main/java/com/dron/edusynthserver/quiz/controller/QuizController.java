package com.dron.edusynthserver.quiz.controller;

import com.dron.edusynthserver.quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.quiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/quiz")
public class QuizController
{
    private final QuizService quizService;
    private final QuizMapper quizMapper;

    @Autowired
    public QuizController(QuizService quizService, QuizMapper quizMapper) {
        this.quizService = quizService;
        this.quizMapper = quizMapper;
    }

    // Получить список всех квизов (доступно всем)
    @GetMapping
    public ResponseEntity<List<QuizDto>> getAllQuizzes() {
        List<QuizDto> quizzes = quizMapper.toDTOList(quizService.getAllQuizzes());
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    // Получить информацию о конкретном квизе (доступно всем)
    @GetMapping("/{quizId}")
    public ResponseEntity<QuizDto> getQuizById(@PathVariable Long quizId) {
        QuizDto quizDTO = quizMapper.toDTO(quizService.getQuizById(quizId));
        return new ResponseEntity<>(quizDTO, HttpStatus.OK);
    }

    // Создать новый квиз (требуется авторизация)
    @PostMapping
    public ResponseEntity<QuizDto> createQuiz(@RequestBody QuizDto quizDTO, Authentication authentication) {
        // Проверяем, авторизован ли пользователь
        if (authentication != null && authentication.isAuthenticated()) {
            // Преобразуем DTO в модель и сохраняем
            Quiz createdQuiz = quizService.createQuiz(quizMapper.toModel(quizDTO), authentication.getName());
            return new ResponseEntity<>(quizMapper.toDTO(createdQuiz), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Получить следующий вопрос в сессии (требуется авторизация)
    @GetMapping("/{quizId}/next")
    public ResponseEntity<QuestionDto> getNextQuestion(@PathVariable Long quizId) {
        // TODO: Добавить логику получения следующего вопроса
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }

    // Получить результаты прохождения сессии (требуется авторизация)
    @GetMapping("/{quizId}/results")
    public ResponseEntity<List<ParticipantDto>> getResults(@PathVariable Long quizId) {
        // TODO: Добавить логику получения результатов
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }
}
