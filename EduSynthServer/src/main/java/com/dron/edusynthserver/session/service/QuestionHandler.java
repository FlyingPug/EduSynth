package com.dron.edusynthserver.session.service;

import com.dron.edusynthserver.quiz.model.Answer;
import com.dron.edusynthserver.session.dto.UserAnswerDto;

import java.util.Collection;
import java.util.List;

public interface QuestionHandler
{
    boolean isAnswerCorrect(Collection<UserAnswerDto> userAnswers, Collection<Answer> answers);
}
