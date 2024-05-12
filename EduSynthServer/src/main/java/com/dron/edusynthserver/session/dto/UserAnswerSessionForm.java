package com.dron.edusynthserver.session.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserAnswerSessionForm
{
    private String sessionCode;
    private List<UserAnswerDto> answers;
}
