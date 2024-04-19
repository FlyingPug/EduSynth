package com.dron.edusynthserver.session.dto;

import lombok.Data;

@Data
public class ParticipantDto
{
    private String name;
    // private String gameCode; ну и зачем это надо
    // private String token;
    private int Score;
    private boolean isLeader;
}
