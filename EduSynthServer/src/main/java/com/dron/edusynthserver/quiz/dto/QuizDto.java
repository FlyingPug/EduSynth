package com.dron.edusynthserver.quiz.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizDto
{
    private Long id;
    private String title;
    private String description;
    private boolean isPublic;
    private Long creatorId;
    private List<QuestionDto> questionDtos;
}
