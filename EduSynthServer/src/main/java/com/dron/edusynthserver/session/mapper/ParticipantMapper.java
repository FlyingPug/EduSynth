package com.dron.edusynthserver.session.mapper;

import com.dron.edusynthserver.session.dto.ParticipantDto;
import com.dron.edusynthserver.session.model.Participant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {

    @Mapping(target = "name", source = "participant.user.username")
    @Mapping(target = "gameCode", source = "participant.session.sessionCode")
    @Mapping(target = "token", ignore = true)
    ParticipantDto toDto(Participant participant);


    List<ParticipantDto> toDtoList(List<ParticipantDto> participantDtoList);
}
