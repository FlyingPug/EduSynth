package com.dron.edusynthserver.quiz.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentQuestionState
{
    private int id;
    private int timeRemaining;
}
