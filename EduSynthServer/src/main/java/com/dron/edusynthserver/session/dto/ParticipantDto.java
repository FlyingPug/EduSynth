package com.dron.edusynthserver.session.dto;

import lombok.Data;

@Data
public class ParticipantDto
{
    private String name;
    private String gameCode;
    private String token;
    private int Score;
}
