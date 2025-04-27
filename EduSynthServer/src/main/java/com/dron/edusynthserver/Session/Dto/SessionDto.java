package com.dron.edusynthserver.Session.Dto;

import com.dron.edusynthserver.Quiz.Dto.Response.QuizResponseDto;
import com.dron.edusynthserver.Session.Model.SessionStatus;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionDto implements Serializable
{
    private String id;
    private QuizResponseDto quiz;
    private SessionStatus status;
    private Instant startTime;
    int currentQuestionIndex;
    List<ParticipantDto> participants;
    Duration questionTimeLimit;
    boolean timeExpired;
    boolean finished;
}
