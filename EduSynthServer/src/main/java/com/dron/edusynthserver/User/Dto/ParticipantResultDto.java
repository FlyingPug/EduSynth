package com.dron.edusynthserver.User.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ParticipantResultDto {
    private int userId;
    private int score;
}
