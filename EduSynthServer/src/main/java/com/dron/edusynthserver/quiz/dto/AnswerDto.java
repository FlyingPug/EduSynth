package com.dron.edusynthserver.quiz.dto;

import lombok.Data;

// вообще, логичней сделать это как optionDto, а не AnswerDto, ну похуя короче
@Data
public class AnswerDto
{
    private int id;
    private String text;
    private String mediaUrl;
}
