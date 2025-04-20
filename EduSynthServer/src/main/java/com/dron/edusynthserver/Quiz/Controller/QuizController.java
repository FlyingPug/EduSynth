package com.dron.edusynthserver.Quiz.Controller;

import com.dron.edusynthserver.Common.Annotations.CheckQuizOwnershipOrAdmin;
import com.dron.edusynthserver.Common.Config.EduSynthUrl;
import com.dron.edusynthserver.Exceptions.ForbiddenException;
import com.dron.edusynthserver.Quiz.Dto.Request.QuizRequestDto;
import com.dron.edusynthserver.Quiz.Dto.Response.QuizResponseDto;
import com.dron.edusynthserver.Quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.Quiz.Dto.QuizTitleDto;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import com.dron.edusynthserver.Quiz.Service.QuizService;
import com.dron.edusynthserver.User.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public QuizResponseDto createQuiz(@RequestBody QuizRequestDto quizDTO) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Quiz createdQuiz = quizService.createQuiz(quizDTO, user.getId());

        return quizMapper.toDTO(createdQuiz);
    }

    @GetMapping("query")
    public Page<QuizTitleDto> query(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size,
                                         @RequestParam(defaultValue = "id") String sortBy) {
        return quizService.query(page, size, sortBy).map(quizMapper::toShortDto);
    }

    @GetMapping("/{quizId}")
    public QuizResponseDto getQuiz(@PathVariable Long quizId)
    {
        Quiz quiz = quizService.requireQuizById(Math.toIntExact(quizId));

        User auth = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();;
        boolean isPublicQuiz = quiz.isPublic();
        boolean isCreator = Objects.equals(auth.getId(), quiz.getCreator().getId());

        if(isPublicQuiz || isCreator) return quizMapper.toDTO(quiz);

        throw new ForbiddenException("This quiz is private");
    }

    @CheckQuizOwnershipOrAdmin
    @DeleteMapping("/{quizId}")
    public void deleteQuizById(@PathVariable Long quizId) {
        quizService.deleteQuizById(Math.toIntExact(quizId));
    }
}
