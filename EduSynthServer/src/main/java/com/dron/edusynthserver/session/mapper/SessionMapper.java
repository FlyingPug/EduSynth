package com.dron.edusynthserver.session.mapper;

import com.dron.edusynthserver.quiz.Mapper.QuestionMapper;
import com.dron.edusynthserver.quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.session.dto.ParticipantDto;
import com.dron.edusynthserver.session.dto.SessionDto;
import com.dron.edusynthserver.session.model.Participant;
import com.dron.edusynthserver.session.model.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {QuizMapper.class, ParticipantMapper.class})
public interface SessionMapper
{
    @Mapping(target = "participantToken", ignore = true)
    SessionDto toDto(Session participant);


    List<ParticipantDto> toDtoList(List<ParticipantDto> participantDtoList);
}
