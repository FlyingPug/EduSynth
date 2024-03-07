package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.dto.QuizTitleDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {QuestionMapper.class})//, QuizMapperResolver.class})
public interface QuizMapper {
    @Mapping(target = "creatorId", source = "quiz.creator.id")
    QuizDto toDTO(Quiz quiz);

    List<QuizDto> toDTOList(List<Quiz> quizzes);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creator", ignore = true)
    Quiz toModel(QuizDto quizDTO);

    QuizTitleDto toShortDto(Quiz quiz);
}