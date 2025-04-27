package com.dron.edusynthserver.Session.Service;

import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import com.dron.edusynthserver.Session.Model.Session;

import java.util.List;

public interface SessionService
{
    void processAnswer(String sessionCode, Integer userId, List<ParticipantAnswer> answers);
    Session requireSessionByCode(String sessionCode);
    Session joinSession(String sessionCode, Integer userId);
    Session startSession(String sessionCode, Integer userId);
    Session createSession(Integer QuizId, Integer userId);
}
