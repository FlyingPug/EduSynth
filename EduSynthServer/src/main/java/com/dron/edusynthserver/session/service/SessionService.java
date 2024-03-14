package com.dron.edusynthserver.session.service;

import com.dron.edusynthserver.exceptions.BadNameException;
import com.dron.edusynthserver.session.dto.*;
import com.dron.edusynthserver.user.model.User;

import java.util.List;

public interface SessionService
{
    SessionStateDto getSessionState(String sessionCode);

    SessionDto joinSession(String sessionCode, User user);
    void startSession(String sessionCode, User user);

    SessionDto createSession(int QuizId, User user);

    SessionDto joinSessionAsGuest(String sessionCode, String name) throws BadNameException;

    ParticipantDto getParticipant(String sessionCode, String name);

    void answerQuestion(String SessionCode, List<UserAnswerDto> answers, User user);

    SessionResultDto getSessionResult(String sessionCode);
}
