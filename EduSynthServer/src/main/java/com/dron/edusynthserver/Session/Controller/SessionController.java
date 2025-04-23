package com.dron.edusynthserver.Session.Controller;

import com.dron.edusynthserver.Common.Config.EduSynthUrl;
import com.dron.edusynthserver.Session.Dto.*;
import com.dron.edusynthserver.Session.Mapper.SessionMapper;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import com.dron.edusynthserver.Session.Service.SessionService;
import com.dron.edusynthserver.User.Model.User;
import com.dron.edusynthserver.User.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EduSynthUrl.SESSION)
@RequiredArgsConstructor
public class SessionController {
    private final SessionService sessionService;
    private final SessionMapper sessionMapper;

    @PostMapping("/create")
    public SessionDto createSession(@RequestBody Integer quizId) {
        return sessionMapper.toSessionDto(
                sessionService.createSession(quizId, getCurrentUserId())
        );
    }

    @PostMapping("/{sessionId}/join")
    public SessionDto joinSession(@RequestBody SessionCodeDto sessionId) {
        return sessionMapper.toSessionDto(
                sessionService.joinSession(sessionId.getSessionCode(), getCurrentUserId())
        );
    }

    @PostMapping("/{sessionId}/start")
    public SessionDto startSession(@PathVariable SessionCodeDto sessionId) {
        return sessionMapper.toSessionDto(
                sessionService.startSession(sessionId.getSessionCode(), getCurrentUserId())
        );
    }

    @PostMapping("/{sessionId}/answer")
    public void answerQuestion(
            @PathVariable String sessionId,
            @RequestBody List<ParticipantAnswer> answers
    ) {
        sessionService.processAnswer(sessionId, getCurrentUserId(), answers);
    }

    @GetMapping("/{sessionId}/state")
    public SessionStateDto getSessionState(@PathVariable String sessionId) {
        return sessionMapper.toSessionStateDto(
                sessionService.findSessionByCode(sessionId)
        );
    }

    private Integer getCurrentUserId() {
        User auth = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return auth.getId();
    }
}