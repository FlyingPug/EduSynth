package com.dron.edusynthserver.Quiz.Dto.Response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TextInputQuestionResponseDto extends QuestionResponseDto {
    private Integer answerLength;
}
