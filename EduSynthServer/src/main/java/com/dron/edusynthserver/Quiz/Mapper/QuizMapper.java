package com.dron.edusynthserver.Quiz.Mapper;

import com.dron.edusynthserver.Quiz.Dto.Request.QuizRequestDto;
import com.dron.edusynthserver.Quiz.Dto.QuizTitleDto;
import com.dron.edusynthserver.Quiz.Dto.Response.QuizResponseDto;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {QuestionMapper.class})//, QuizMapperResolver.class})
public interface QuizMapper {
    @Mapping(target = "creatorId", source = "quiz.creator.id")
    QuizResponseDto toDTO(Quiz quiz);

    QuizTitleDto toShortDto(Quiz quiz);
}