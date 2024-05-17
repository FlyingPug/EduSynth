package com.dron.edusynthserver.session.dto;

import com.dron.edusynthserver.user.dto.ParticipantResultDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class SessionResultDto {
    List<ParticipantDto> participantDtoList;
}
