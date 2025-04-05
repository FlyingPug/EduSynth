package com.dron.edusynthserver.Quiz.Dto.Request;

import com.dron.edusynthserver.Quiz.Dto.QuestionTypeDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TextInputQuestionRequestDto extends QuestionRequestDto {
    private String correctAnswer;

    @Override
    public QuestionTypeDto getQuestionType() {
        return QuestionTypeDto.INPUT_TEXT;
    }
}
