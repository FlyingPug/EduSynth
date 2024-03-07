package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.AnswerDto;
import com.dron.edusynthserver.quiz.model.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswersMapper

{
    AnswerDto toDTO(Answer answer);

    @Mapping(target = "participants", ignore = true)
    @Mapping(target = "question", ignore = true)
    Answer toModel(AnswerDto answerDto);

    @Mapping(target = "participants", ignore = true)
    @Mapping(target = "question", ignore = true)
    List<AnswerDto> toDTOList(List<Answer> answers);

}
