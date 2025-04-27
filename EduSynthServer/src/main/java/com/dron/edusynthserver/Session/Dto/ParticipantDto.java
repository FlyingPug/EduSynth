package com.dron.edusynthserver.Session.Dto;

import lombok.Data;

@Data
public class ParticipantDto
{
    private String name;
    private String imageUrl;
    private int score;
    private boolean isLeader;
}
