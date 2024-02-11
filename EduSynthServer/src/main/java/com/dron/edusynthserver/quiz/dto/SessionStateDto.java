package com.dron.edusynthserver.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SessionStateDto
{
    private int timeRemainingToNextQuestionSec;
    private int currentQuestionId;
    private boolean doesSessionHasEnded;
}
