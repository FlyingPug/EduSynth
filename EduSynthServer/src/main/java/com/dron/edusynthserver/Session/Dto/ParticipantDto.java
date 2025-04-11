package com.dron.edusynthserver.Session.Dto;

import lombok.Data;

@Data
public class ParticipantDto
{
    private String name;
    private int score;
    private boolean isLeader;
}
