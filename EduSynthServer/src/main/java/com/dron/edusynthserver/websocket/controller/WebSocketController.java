package com.dron.edusynthserver.websocket.controller;

import com.dron.edusynthserver.session.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    final SessionService sessionService;

    @Autowired
    public WebSocketController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @SubscribeMapping("/session/{code}")
    public void handleSubscription(@DestinationVariable String code) {
        sessionService.sendSessionState(code);
    }
}
