package com.dron.edusynthserver.Quiz.Dto.Request;

import lombok.Data;

@Data
public class AnswerRequestDto
{
    private String text;
    private String mediaUrl;
    private boolean correct;
}
