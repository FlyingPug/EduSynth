package com.dron.edusynthserver.Quiz.Dto.Response;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class SingleChoiceQuestionResponseDto extends QuestionResponseDto {
    private List<AnswerResponseDto> answers;
}
