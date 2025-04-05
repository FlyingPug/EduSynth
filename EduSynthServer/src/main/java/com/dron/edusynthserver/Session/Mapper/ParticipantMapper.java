package com.dron.edusynthserver.Session.Mapper;

import com.dron.edusynthserver.Session.Dto.ParticipantDto;
import com.dron.edusynthserver.Session.Dto.UserAnswerDto;
import com.dron.edusynthserver.Session.Model.Participant;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {
     @Mapping(target = "name", source = "participant.user.username")
    //@Mapping(target = "gameCode", source = "participant.session.sessionCode")
   // @Mapping(target = "token", ignore = true)
    ParticipantDto toDto(Participant participant);
    List<ParticipantDto> toDtoList(List<Participant> participantList);
}
