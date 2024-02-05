package com.dron.edusynthserver.quiz.service;

import com.dron.edusynthserver.exceptions.BadNameException;
import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.model.Participant;
import com.dron.edusynthserver.user.model.User;
import org.springframework.data.util.Pair;

import java.util.List;

public interface SessionService
{
    ParticipantDto joinSession(String sessionCode, User user);

    ParticipantDto createSession(int QuizId, User user);

    ParticipantDto joinSessionAsGuest(String sessionCode, String name) throws BadNameException;

    ParticipantDto getParticipant(String sessionCode, String name);

    void answerQuestion(ParticipantDto participant, List<Long> answers);

    List<Pair<ParticipantDto, Long>> getSessionResult(ParticipantDto participant);
}
