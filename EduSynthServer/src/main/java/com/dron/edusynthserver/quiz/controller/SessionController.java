package com.dron.edusynthserver.quiz.controller;

import com.dron.edusynthserver.quiz.dto.AnswerDto;
import com.dron.edusynthserver.quiz.dto.ParticipantDto;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.quiz.service.SessionService;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/session")
public class SessionController
{
    private final UserService userService;
    private final SessionService sessionService;

    @Autowired
    public SessionController(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    // Ветка для незарегистрированных пользователей
    @PostMapping("/join-session")
    public ResponseEntity<ParticipantDto> joinSession(@RequestParam String sessionCode, @RequestParam String name) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ParticipantDto participant;

        if (auth.isAuthenticated())
        {
            participant = sessionService.joinSession(sessionCode, userService.getUserByName(auth.getName()));

        }
        else
        {
            participant = sessionService.joinSessionAsGuest(sessionCode, name);
        }
        return ResponseEntity.ok(participant);
    }

    @PostMapping("/answer-question")
    public ResponseEntity.BodyBuilder answerQuestion(@RequestBody String sessionCode, @RequestBody List<Long> answers)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ParticipantDto participant = sessionService.getParticipant(sessionCode, auth.getName());
        sessionService.answerQuestion(participant, answers);

        return ResponseEntity.accepted();
    }

    @GetMapping("/participant-results")
    public ResponseEntity<List<Pair<ParticipantDto, Long>>> getResults(@RequestParam String sessionCode)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ParticipantDto participant = sessionService.getParticipant(sessionCode, auth.getName());
        List<Pair<ParticipantDto, Long>> result = sessionService.getSessionResult(participant);

        return ResponseEntity.ok(result);
    }
}
