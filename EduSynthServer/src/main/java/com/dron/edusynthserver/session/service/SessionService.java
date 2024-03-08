package com.dron.edusynthserver.session.service;

import com.dron.edusynthserver.exceptions.BadNameException;
import com.dron.edusynthserver.session.dto.ParticipantDto;
import com.dron.edusynthserver.session.dto.SessionDto;
import com.dron.edusynthserver.session.dto.SessionResultDto;
import com.dron.edusynthserver.session.dto.SessionStateDto;
import com.dron.edusynthserver.user.model.User;

import java.util.List;

public interface SessionService
{
    SessionStateDto getSessionState(String sessionCode);

    SessionDto joinSession(String sessionCode, User user);

    SessionDto createSession(int QuizId, User user);

    SessionDto joinSessionAsGuest(String sessionCode, String name) throws BadNameException;

    ParticipantDto getParticipant(String sessionCode, String name);

    void answerQuestion(ParticipantDto participant, List<Integer> answers);

    SessionResultDto getSessionResult(String sessionCode);
}
