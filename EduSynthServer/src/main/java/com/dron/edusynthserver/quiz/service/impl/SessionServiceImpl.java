package com.dron.edusynthserver.quiz.service.impl;

import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.repository.SessionRepository;
import com.dron.edusynthserver.quiz.service.SessionService;
import com.dron.edusynthserver.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionServiceImpl implements SessionService {

    SessionRepository sessionRepository;

    @Autowired
    public SessionServiceImpl(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public ParticipantDto joinSession(String sessionCode, User user) {
        return null;
    }

    @Override
    public ParticipantDto createSession(User user) {
        return null;
    }

    @Override
    public ParticipantDto joinSessionAsGuest(String sessionCode, String name) {
        return null;
    }

    @Override
    public ParticipantDto getParticipant(String name) {
        return null;
    }

    @Override
    public void answerQuestion(ParticipantDto participant, List<Long> answers) {

    }

    @Override
    public List<Pair<ParticipantDto, Long>> getSessionResult(ParticipantDto participant) {
        return null;
    }
}
