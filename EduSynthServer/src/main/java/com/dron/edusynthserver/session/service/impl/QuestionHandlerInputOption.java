package com.dron.edusynthserver.session.service.impl;

import com.dron.edusynthserver.Exceptions.BadAnswerFormat;
import com.dron.edusynthserver.quiz.Model.Answer;
import com.dron.edusynthserver.session.dto.UserAnswerDto;
import com.dron.edusynthserver.session.service.QuestionHandler;

import java.util.Collection;

public class QuestionHandlerInputOption implements QuestionHandler
{
    @Override
    public boolean isAnswerCorrect(Collection<UserAnswerDto> userAnswers, Collection<Answer> answers) {
        if(userAnswers.size() != answers.size()) throw new BadAnswerFormat("Не все поля ответа введены");

        // Проверяем, что для каждого ответа из answers в userAnswers есть соответствующий ответ с тем же текстом
        return answers.stream()
                .allMatch(answer -> userAnswers.stream()
                        .anyMatch(userAnswer -> userAnswer.getAnswer().equals(answer.getText())));
    }
}
