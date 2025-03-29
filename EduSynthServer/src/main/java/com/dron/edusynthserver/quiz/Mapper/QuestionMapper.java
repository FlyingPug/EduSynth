package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.Model.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AnswersMapper.class})
public interface QuestionMapper
{
    QuestionDto toDTO(Question question);

    @Mapping(target = "quiz", ignore = true)
    Question toModel(QuestionDto questionDTO);
}
