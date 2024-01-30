package com.dron.edusynthserver.quiz.service;

import com.dron.edusynthserver.quiz.model.Quiz;

import java.util.List;

public interface QuizService
{
    /**
     * TODO Прокомментируй
     */
    List<Quiz> getAllQuizzes();

    /**
     * TODO Прокомментируй
     * @param quizId id
     */
    Quiz getQuizById(Long quizId);

    /**
     * TODO Прокомментируй
     * @param quizModel quizmodel
     */
    Quiz createQuiz(Quiz quizModel, String creatorUsername);
}
