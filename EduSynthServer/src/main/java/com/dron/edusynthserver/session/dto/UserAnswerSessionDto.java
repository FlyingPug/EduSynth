package com.dron.edusynthserver.session.dto;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Data
public class UserAnswerSessionDto
{
    private String sessionCode;
    private List<UserAnswerDto> answers;
}
