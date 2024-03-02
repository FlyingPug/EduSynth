package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.AnswerDto;
import com.dron.edusynthserver.quiz.model.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswersMapper
{
    AnswerDto toDTO(Answer answer);

    List<AnswerDto> toDTOList(List<Answer> answers);
}
