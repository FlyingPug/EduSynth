package com.dron.edusynthserver.quiz.controller;

import com.dron.edusynthserver.quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.dto.QuizTitleDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.quiz.service.QuizService;
import com.dron.edusynthserver.quiz.service.SessionService;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/quiz")
public class QuizController
{
    private final QuizService quizService;
    private final QuizMapper quizMapper;
    private final UserService userService;

    @Autowired
    public QuizController(QuizService quizService, QuizMapper quizMapper, UserService userService) {
        this.quizService = quizService;
        this.quizMapper = quizMapper;
        this.userService = userService;
    }

    // Создать новый квиз (требуется авторизация)
    @PostMapping
    public ResponseEntity<QuizDto> createQuiz(@RequestBody QuizDto quizDTO, Authentication authentication) {
        // Проверяем, авторизован ли пользователь
        if (authentication != null && authentication.isAuthenticated()) {
            // Преобразуем DTO в модель и сохраняем
            Quiz createdQuiz = quizService.createQuiz(quizDTO, authentication.getName());
            return new ResponseEntity<>(quizMapper.toDTO(createdQuiz), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Получить список всех квизов (доступно всем)
    @GetMapping
    public Page<QuizTitleDto> getQuizzes(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size) {
        return quizService.getQuizTitles(page, size);
    }

    // Получить информацию о конкретном квизе (доступно всем)
    @GetMapping("/{quizId}")
    public ResponseEntity<QuizDto> getQuizById(@PathVariable Long quizId) {
        QuizDto quizDTO = quizMapper.toDTO(quizService.getQuizById(Math.toIntExact(quizId)));
        return new ResponseEntity<>(quizDTO, HttpStatus.OK);
    }

    // Получить следующий вопрос в сессии (требуется авторизация)
    @GetMapping("/{quizId}/{questionNumb}")
    public ResponseEntity<QuestionDto> getQuestion(@PathVariable int quizId, @PathVariable int questionNumb) {
        QuestionDto questionDto = quizService.getQuestion(questionNumb, quizId);
        return ResponseEntity.ok(questionDto);
    }
}
