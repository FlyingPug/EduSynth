package com.dron.edusynthserver.quiz.dto;

import com.dron.edusynthserver.user.dto.ParticipantResultDto;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class SessionResultDto {
    List<ParticipantResultDto> participantResultDtoList;
}
