package com.dron.edusynthserver.Quiz.Service;

import com.dron.edusynthserver.Quiz.Dto.Request.QuizRequestDto;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import org.springframework.data.domain.Page;

public interface QuizService
{
    Quiz getQuizById(Integer quizId);

    Quiz requireQuizById(Integer quizId);

    Quiz createQuiz(QuizRequestDto quizDto, Integer creatorId);

    Page<Quiz> query(int page, int size, String sortBy);

    void deleteQuizById(int toIntExact);
}
