package com.dron.edusynthserver.quiz.service;

import com.dron.edusynthserver.exceptions.BadNameException;
import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.dto.SessionResultDto;
import com.dron.edusynthserver.quiz.dto.SessionStateDto;
import com.dron.edusynthserver.user.model.User;

import java.util.List;

public interface SessionService
{
    SessionStateDto getSessionState(String sessionCode);

    ParticipantDto joinSession(String sessionCode, User user);

    ParticipantDto createSession(int QuizId, User user);

    ParticipantDto joinSessionAsGuest(String sessionCode, String name) throws BadNameException;

    ParticipantDto getParticipant(String sessionCode, String name);

    void answerQuestion(ParticipantDto participant, List<Integer> answers);

    SessionResultDto getSessionResult(String sessionCode);
}
