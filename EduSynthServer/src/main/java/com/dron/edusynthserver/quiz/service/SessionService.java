package com.dron.edusynthserver.quiz.service;

import com.dron.edusynthserver.user.model.User;

public interface SessionService
{
    void joinSession(String sessionCode, User user);

    void createSession(User user);
}
