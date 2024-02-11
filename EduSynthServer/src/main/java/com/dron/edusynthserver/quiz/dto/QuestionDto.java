package com.dron.edusynthserver.quiz.dto;

import com.dron.edusynthserver.quiz.model.QuestionType;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDto
{
    private int id;
    private String text;
    private String mediaUrl;
    private QuestionType type;
    private Integer timeLimitSeconds;
    private List<AnswerDto> answerDtoList;
}
