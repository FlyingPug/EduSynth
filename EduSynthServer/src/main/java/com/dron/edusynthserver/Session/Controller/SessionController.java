package com.dron.edusynthserver.Session.Controller;

import com.dron.edusynthserver.Common.Config.EduSynthUrl;
import com.dron.edusynthserver.Session.Dto.*;
import com.dron.edusynthserver.Session.Mapper.SessionMapper;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import com.dron.edusynthserver.Session.Service.SessionService;
import com.dron.edusynthserver.User.Model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EduSynthUrl.SESSION)
@RequiredArgsConstructor
public class SessionController {
    private final SessionService sessionService;
    private final SessionMapper sessionMapper;

    @PostMapping
    public SessionDto createSession(@RequestBody Integer quizId) {
        return sessionMapper.toSessionDto(
                sessionService.createSession(quizId, getCurrentUserId())
        );
    }

    @PostMapping("/{sessionId}/join")
    public SessionDto joinSession(@PathVariable String sessionId) {
        return sessionMapper.toSessionDto(
                sessionService.joinSession(sessionId, getCurrentUserId())
        );
    }

    @PostMapping("/{sessionId}/start")
    public SessionDto startSession(@PathVariable String sessionId) {
        return sessionMapper.toSessionDto(
                sessionService.startSession(sessionId, getCurrentUserId())
        );
    }

    @PostMapping("/{sessionId}/answer")
    public void answerQuestion(
            @PathVariable String sessionId,
            @RequestBody List<ParticipantAnswerDto> answers
    ) {
        sessionService.processAnswer(
                sessionId,
                getCurrentUserId(),
                sessionMapper.toParticipantAnswerList(answers)
        );
    }

    @GetMapping("/{sessionId}")
    @Cacheable(value = "sessionState", key = "#sessionId")
    public SessionDto getSessionState(@PathVariable String sessionId) {
        var session = sessionService.requireSessionByCode(sessionId);
        return sessionMapper.toSessionDto(session);
    }

    private Integer getCurrentUserId() {
        User auth = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return auth.getId();
    }
}