package com.dron.edusynthserver.Session.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class SessionResultDto {
    List<ParticipantDto> participantDtoList;
}
