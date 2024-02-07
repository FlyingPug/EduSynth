package com.dron.edusynthserver.quiz.controller;

import com.dron.edusynthserver.quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.dto.QuizTitleDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.quiz.service.QuizService;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
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
    @PreAuthorize("isAuthenticated()")
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

    // Получить список всех квизов (доступно всем и вроде ок)
    @GetMapping("quizzes")
    public Page<QuizTitleDto> getPublicQuizzes(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size,
                                         @RequestParam(defaultValue = "id") String sortBy) {
        return quizService.getQuizTitles(page, size, sortBy);
    }

    // просто получает квиз
    @GetMapping("/{quizId}")
    public ResponseEntity<QuizDto> getQuiz(@PathVariable Long quizId)
    {
        Quiz quiz = quizService.getQuizById(Math.toIntExact(quizId));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        boolean isPublicQuiz = quiz.isPublic();
        boolean isAuthenticated = auth.isAuthenticated();
        boolean isCreator = isAuthenticated && Objects.equals(auth.getName(), quiz.getCreator().getUsername());

        return (isPublicQuiz || isCreator)
                ? ResponseEntity.ok(quizMapper.toDTO(quiz))
                : ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    // Вроде ок, просто удаляет квиз
    @DeleteMapping("/{quizId}")
    public ResponseEntity.BodyBuilder deleteQuizById(@PathVariable Long quizId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String authUsername = auth.getName();

        String authorName = quizService.getQuizById(Math.toIntExact(quizId)).getCreator().getUsername();

        if(Objects.equals(authorName, authUsername))
        {
            quizService.deleteQuizById(Math.toIntExact(quizId));
            return ResponseEntity.status(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN);
    }
}
