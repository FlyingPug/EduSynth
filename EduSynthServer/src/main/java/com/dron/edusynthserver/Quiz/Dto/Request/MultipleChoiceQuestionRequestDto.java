package com.dron.edusynthserver.Quiz.Dto.Request;

import com.dron.edusynthserver.Quiz.Dto.QuestionTypeDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class MultipleChoiceQuestionRequestDto extends QuestionRequestDto {
    private List<AnswerRequestDto> answers;

    @Override
    public QuestionTypeDto getQuestionType() {
        return QuestionTypeDto.CHOOSE_MULTIPLE_OPTIONS;
    }
}