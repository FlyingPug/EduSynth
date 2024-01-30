package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {QuestionMapper.class})
public interface QuizMapper {
    QuizDto toDTO(Quiz quiz);

    List<QuizDto> toDTOList(List<Quiz> quizzes);

    Quiz toModel(QuizDto quizDTO);
}