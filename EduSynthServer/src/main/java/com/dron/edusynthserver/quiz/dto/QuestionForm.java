package com.dron.edusynthserver.quiz.dto;

import com.dron.edusynthserver.quiz.Model.QuestionType;
import lombok.Data;

import java.util.List;

@Data
public class QuestionForm {
    private String text;
    private String mediaUrl;
    private QuestionType type;
    private Integer timeLimitSeconds;
    private List<AnswerForm> answerDtoList;
}
