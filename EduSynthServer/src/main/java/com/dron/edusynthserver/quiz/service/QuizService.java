package com.dron.edusynthserver.quiz.service;

import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.dto.QuizTitleDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import org.springframework.data.domain.Page;

import java.util.List;

public interface QuizService
{
    /**
     * TODO Прокомментируй
     * @param quizId id
     */
    Quiz getQuizById(Integer quizId);

    /**
     * TODO Прокомментируй
     * @param quizModel quizmodel
     */
    Quiz createQuiz(QuizDto quizModel, String creatorUsername);

    QuestionDto getQuestion(int questionNumb, int quizId);

    Page<QuizTitleDto> getQuizTitles(int page, int size);
}
