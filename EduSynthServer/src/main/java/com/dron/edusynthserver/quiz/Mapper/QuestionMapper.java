package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.model.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AnswersMapper.class})
public interface QuestionMapper
{
    @Mapping(target = "answerDtoList", source = "question.answers")
    QuestionDto toDTO(Question question);

    // TODO
    Question toModel(QuestionDto questionDTO);
}
