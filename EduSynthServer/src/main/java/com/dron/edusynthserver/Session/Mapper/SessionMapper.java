package com.dron.edusynthserver.Session.Mapper;

import com.dron.edusynthserver.Quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.Session.Dto.ParticipantAnswerDto;
import com.dron.edusynthserver.Session.Dto.SessionStateDto;
import com.dron.edusynthserver.Session.Dto.SessionDto;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import com.dron.edusynthserver.Session.Model.Session;
import com.dron.edusynthserver.Session.Model.SessionStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Mapper(componentModel = "spring", uses = {QuizMapper.class, ParticipantMapper.class}, imports = {SessionStatus.class})
public interface SessionMapper
{
    @Mapping(target = "timeExpired", expression = "java(entity.isTimeExpired())")
    @Mapping(target = "finished", expression = "java(entity.getStatus() == SessionStatus.FINISHED)")
    SessionDto toSessionDto(Session entity);

    @Mapping(target = "sessionId", source = "id")
    @Mapping(target = "timeRemaining", expression = "java(calculateTimeRemaining(entity))")
    SessionStateDto toSessionStateDto(Session entity);

    @Mapping(target = "answerId", source = "answerId")
    @Mapping(target = "orderIndex", source = "orderIndex")
    @Mapping(target = "answer", source = "answer")
    @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
    @Mapping(target = "participant", ignore = true)
    @Mapping(target = "question", ignore = true)
    List<ParticipantAnswer> toParticipantAnswerList(List<ParticipantAnswerDto> dto);

    default long calculateTimeRemaining(Session session) {
        if (session.getStatus() != SessionStatus.ACTIVE) {
            return 0;
        }
        Duration elapsed = Duration.between(session.getStartTime(), Instant.now());
        Duration remaining = session.getQuestionTimeLimit().minus(elapsed);
        return remaining.toMillis();
    }

}
