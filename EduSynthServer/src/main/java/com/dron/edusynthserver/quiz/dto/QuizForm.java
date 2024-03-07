package com.dron.edusynthserver.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizForm
{
    private String title;
    private String description;
    private String titleMediaUrl;
    private boolean isPublic;
    private int creatorId;
    private List<QuestionForm> questions;
}
