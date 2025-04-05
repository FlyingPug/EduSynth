package com.dron.edusynthserver.Session.Dto;

import com.dron.edusynthserver.Session.Model.SessionStatus;
import lombok.*;

import java.time.Duration;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionStateDto {
    private String sessionId;
    private SessionStatus status;
    private int currentQuestionIndex;
    private Duration questionTimeLimit;
    private long timeRemaining;
    private List<ParticipantDto> participants;
}