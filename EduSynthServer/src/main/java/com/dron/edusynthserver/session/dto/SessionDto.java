package com.dron.edusynthserver.session.dto;

import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.session.model.Participant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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
}
