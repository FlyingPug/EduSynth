package com.dron.edusynthserver.Quiz.Dto.Request;

import com.dron.edusynthserver.Quiz.Dto.QuestionTypeDto;
import com.dron.edusynthserver.Quiz.Model.Question.QuestionType;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChronoOrderQuestionRequestDto extends QuestionRequestDto {
    private List<ChronoEventRequestDto> events;

    @Override
    public QuestionTypeDto getQuestionType() {
        return QuestionTypeDto.CHRONO;
    }
}

