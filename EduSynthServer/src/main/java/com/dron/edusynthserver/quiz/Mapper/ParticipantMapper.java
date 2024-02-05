package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.model.Participant;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ParticipantMapper {
    ParticipantDto toDto(Participant participant);

    Participant toModel(ParticipantDto participantDto);

    List<ParticipantDto> toDtoList(List<ParticipantDto> participantDtoList);
}
