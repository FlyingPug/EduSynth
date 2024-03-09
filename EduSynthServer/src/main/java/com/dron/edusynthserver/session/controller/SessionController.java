package com.dron.edusynthserver.session.controller;

import com.dron.edusynthserver.config.EduSynthUrl;
import com.dron.edusynthserver.exceptions.Unauthorized;
import com.dron.edusynthserver.session.dto.SessionDto;
import com.dron.edusynthserver.session.model.Session;
import com.dron.edusynthserver.session.service.SessionService;
import com.dron.edusynthserver.session.dto.ParticipantDto;
import com.dron.edusynthserver.session.dto.SessionResultDto;
import com.dron.edusynthserver.session.dto.SessionStateDto;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EduSynthUrl.SESSION)
public class SessionController
{
    private final UserService userService;
    private final SessionService sessionService;

    @Autowired
    public SessionController(UserService userService, SessionService sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    @PostMapping("/create-session")
    public ResponseEntity<SessionDto> joinSession(@RequestParam int QuizId) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        SessionDto sessionDto;

        if (auth instanceof AnonymousAuthenticationToken) throw new Unauthorized();

        sessionDto = sessionService.createSession(QuizId, userService.getUserByName(auth.getName()));

        return ResponseEntity.ok(sessionDto);
    }

    // Ветка для незарегистрированных пользователей
    @PostMapping("/join-session")
    public ResponseEntity<SessionDto> joinSession(@RequestParam String sessionCode, @RequestParam String name) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        SessionDto sessionDto;
        // TODO: это полная хуйня, нет смысла делать такую проверку, сделай просто отедльную вилку
        if (!(auth instanceof AnonymousAuthenticationToken))
        {
            sessionDto = sessionService.joinSession(sessionCode, userService.getUserByName(auth.getName()));
        }
        else
        {
            sessionDto = sessionService.joinSessionAsGuest(sessionCode, name);
        }
        return ResponseEntity.ok(sessionDto);
    }

    @PostMapping("/answer-question")
    public ResponseEntity.BodyBuilder answerQuestion(@RequestBody String sessionCode, @RequestBody List<Integer> answers)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        ParticipantDto participant = sessionService.getParticipant(sessionCode, auth.getName());
        sessionService.answerQuestion(participant, answers);

        return ResponseEntity.accepted();
    }

    @GetMapping("/participant-results/{sessionCode}")
    public ResponseEntity<SessionResultDto> getResults(@PathVariable String sessionCode)
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(!(auth instanceof AnonymousAuthenticationToken))
        {
            ParticipantDto participant = sessionService.getParticipant(sessionCode, auth.getName());
            SessionResultDto result = sessionService.getSessionResult(sessionCode);
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    // Получить текущее состояние сессии
    @GetMapping("/{sessionCode}")
    public ResponseEntity<SessionStateDto> getSessionState(@PathVariable String sessionCode) {
        SessionStateDto questionDto = sessionService.getSessionState(sessionCode);
        return ResponseEntity.ok(questionDto);
    }
}
