package com.dron.edusynthserver.session.service.impl;

import com.dron.edusynthserver.quiz.model.Answer;
import com.dron.edusynthserver.session.dto.UserAnswerDto;
import com.dron.edusynthserver.session.service.QuestionHandler;

import java.util.Collection;

public class QuestionHandleMultipleOptions implements QuestionHandler {
    @Override
    public boolean isAnswerCorrect(Collection<UserAnswerDto> userAnswers, Collection<Answer> answers) {
        Collection<Answer> correctAnswers = answers.stream()
                .filter(Answer::isCorrect).toList();

        // Проверяем, что все ответы с isCorrect равным true присутствуют в userAnswers
        return correctAnswers.stream()
                .allMatch(correctAnswer -> userAnswers.stream()
                        .anyMatch(userAnswer -> userAnswer.getAnswerId() == correctAnswer.getId()));
    }
}
