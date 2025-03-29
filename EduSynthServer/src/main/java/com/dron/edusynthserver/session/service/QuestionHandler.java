package com.dron.edusynthserver.session.service;

import com.dron.edusynthserver.quiz.Model.Answer;
import com.dron.edusynthserver.session.dto.UserAnswerDto;

import java.util.Collection;

public interface QuestionHandler
{
    boolean isAnswerCorrect(Collection<UserAnswerDto> userAnswers, Collection<Answer> answers);
}
