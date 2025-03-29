package com.dron.edusynthserver.quiz.Service;

import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.dto.QuizTitleDto;
import com.dron.edusynthserver.quiz.Model.Quiz;
import org.springframework.data.domain.Page;

public interface QuizService
{
    /**
     * TODO Прокомментируй
     * @param quizId id
     */
    Quiz getQuizById(Integer quizId);

    Quiz requireQuizById(Integer quizId);

    /**
     * TODO Прокомментируй
     * @param quizModel quizmodel
     */
    Quiz createQuiz(QuizDto quizModel, String creatorUsername);

    Page<QuizTitleDto> getQuizTitles(int page, int size, String sortBy);

    void deleteQuizById(int toIntExact);
}
