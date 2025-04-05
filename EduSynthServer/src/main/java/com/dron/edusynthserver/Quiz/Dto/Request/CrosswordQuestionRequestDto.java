package com.dron.edusynthserver.Quiz.Dto.Request;

import com.dron.edusynthserver.Quiz.Dto.QuestionTypeDto;
import com.dron.edusynthserver.Quiz.Model.Question.QuestionType;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class CrosswordQuestionRequestDto extends QuestionRequestDto {
    private List<CrosswordCellRequestDto> crosswordCells;

    @Override
    public QuestionTypeDto getQuestionType() {
        return QuestionTypeDto.CROSSWORD;
    }
}