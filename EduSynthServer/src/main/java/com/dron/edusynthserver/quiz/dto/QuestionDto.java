package com.dron.edusynthserver.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDto
{
    private Long id;
    private String text;
    private String mediaUrl;
    private String type;
    private Integer timeLimitSeconds;
    private List<AnswerDto> answerDtoList;
}
