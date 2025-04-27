package com.dron.edusynthserver.Session.Controller;

import com.dron.edusynthserver.Session.Dto.SessionStateDto;
import com.dron.edusynthserver.Session.Mapper.SessionMapper;
import com.dron.edusynthserver.Session.Service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
@RequiredArgsConstructor
public class SessionSubscriptionListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final SessionService sessionService;
    private final SessionMapper sessionMapper;

    @EventListener
    @Transactional
    public void handleSubscription(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String destination = accessor.getDestination();

        if (destination != null && destination.startsWith("/topic/session/")) {
            String sessionCode = destination.substring("/topic/session/".length());

            SessionStateDto currentState = getSessionState(sessionCode);
            messagingTemplate.convertAndSend(
                    destination,
                    currentState
            );
        }
    }

    private SessionStateDto getSessionState(String sessionCode) {
        var session = sessionService.requireSessionByCode(sessionCode);
        return sessionMapper.toSessionStateDto(session);
    }
}