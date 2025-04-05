package com.dron.edusynthserver.Quiz.Dto.Response;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChronoOrderQuestionResponseDto extends QuestionResponseDto {
    private List<ChronoEventResponseDto> events;
}

