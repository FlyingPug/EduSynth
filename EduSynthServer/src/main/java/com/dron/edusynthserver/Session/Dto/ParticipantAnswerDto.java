package com.dron.edusynthserver.Session.Dto;

import lombok.Data;

import java.util.Set;

@Data
public class ParticipantAnswerDto
{
    private int answerId;
    private int orderIndex;
    private String answer;
}
