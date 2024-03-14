package com.dron.edusynthserver.session.dto;

import com.dron.edusynthserver.session.model.SessionState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SessionStateDto
{
    private SessionState sessionState;
    private int timeRemainingToNextQuestionSec;
    private int currentQuestionId;
}
