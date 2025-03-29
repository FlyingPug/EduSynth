package com.dron.edusynthserver.session.dto;

import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.session.model.SessionState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionDto
{
    private QuizDto quiz;
    private List<ParticipantDto> participants;
    private String sessionCode;
    private String participantToken;
    private SessionState sessionState;
}
