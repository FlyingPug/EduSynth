package com.dron.edusynthserver.Quiz.Mapper;

import com.dron.edusynthserver.Quiz.Dto.Response.AnswerResponseDto;
import com.dron.edusynthserver.Quiz.Model.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswersMapper
{
    AnswerResponseDto map(Answer answer);
}
