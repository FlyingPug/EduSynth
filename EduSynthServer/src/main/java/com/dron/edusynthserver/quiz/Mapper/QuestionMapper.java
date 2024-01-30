package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.model.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {AnswersMapper.class})
public interface QuestionMapper
{
    QuestionDto toDTO(Question question);

    List<QuestionDto> toDTOList(List<Question> questions);

    Question toModel(QuestionDto questionDTO);
}
