package com.dron.edusynthserver.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizDto
{
    private int id;
    private String title;
    private String description;
    private String title_media_url;
    private boolean isPublic;
    private int creatorId;
    private List<QuestionDto> questionDtos;
}
