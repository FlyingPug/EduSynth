package com.dron.edusynthserver.Quiz.Model.Factory;

import com.dron.edusynthserver.Quiz.Dto.Request.QuestionRequestDto;
import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Quiz.Model.Quiz;

public interface QuestionFactory {
    Question createQuestion(QuestionRequestDto dto, Quiz quiz);
}
