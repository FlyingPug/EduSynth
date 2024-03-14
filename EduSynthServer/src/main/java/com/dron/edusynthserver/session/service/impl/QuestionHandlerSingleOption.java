package com.dron.edusynthserver.session.service.impl;

import com.dron.edusynthserver.exceptions.BadAnswerFormat;
import com.dron.edusynthserver.quiz.model.Answer;
import com.dron.edusynthserver.session.dto.UserAnswerDto;
import com.dron.edusynthserver.session.service.QuestionHandler;

import java.util.Collection;
import java.util.Optional;

public class QuestionHandlerSingleOption implements QuestionHandler {

    @Override
    public boolean isAnswerCorrect(Collection<UserAnswerDto> userAnswers, Collection<Answer> answers) {
        if (userAnswers.size() != 1) {
            throw new BadAnswerFormat("У данного вопроса должен быть только 1 ответ");
        }

        int answerId = userAnswers.iterator().next().getAnswerId();

        return answers.stream()
                .anyMatch(answer -> answer.getId() == answerId && answer.isCorrect());
    }
}
