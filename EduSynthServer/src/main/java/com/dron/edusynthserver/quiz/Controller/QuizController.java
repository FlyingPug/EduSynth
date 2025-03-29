package com.dron.edusynthserver.quiz.Controller;

import com.dron.edusynthserver.Common.Annotations.CheckQuizOwnershipOrAdmin;
import com.dron.edusynthserver.Common.Controller.Config.EduSynthUrl;
import com.dron.edusynthserver.quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.dto.QuizTitleDto;
import com.dron.edusynthserver.quiz.Model.Quiz;
import com.dron.edusynthserver.quiz.Service.QuizService;
import com.dron.edusynthserver.user.model.User;
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
@RequestMapping(EduSynthUrl.QUIZ)
public class QuizController
{
    private final QuizService quizService;
    private final QuizMapper quizMapper;

    @Autowired
    public QuizController(QuizService quizService, QuizMapper quizMapper) {
        this.quizService = quizService;
        this.quizMapper = quizMapper;
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    @PostMapping
    public ResponseEntity<QuizDto> createQuiz(@RequestBody QuizDto quizDTO, Authentication authentication) {
        Quiz createdQuiz = quizService.createQuiz(quizDTO, authentication.getName());

        return new ResponseEntity<>(quizMapper.toDTO(createdQuiz), HttpStatus.CREATED);
    }

    @GetMapping("query")
    public Page<QuizTitleDto> query(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size,
                                         @RequestParam(defaultValue = "id") String sortBy) {
        return quizService.getQuizTitles(page, size, sortBy);
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<QuizDto> getQuiz(@PathVariable Long quizId)
    {
        Quiz quiz = quizService.requireQuizById(Math.toIntExact(quizId));

        User auth = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();;
        boolean isPublicQuiz = quiz.isPublic();
        boolean isCreator = Objects.equals(auth.getId(), quiz.getCreator().getId());

        return (isPublicQuiz || isCreator)
                ? ResponseEntity.ok(quizMapper.toDTO(quiz))
                : ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @CheckQuizOwnershipOrAdmin
    @DeleteMapping("/{quizId}")
    public void deleteQuizById(@PathVariable Long quizId) {
        quizService.deleteQuizById(Math.toIntExact(quizId));
    }
}
