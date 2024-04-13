package com.dron.edusynthserver.quiz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class QuizDto
{
    private int id;
    private String title;
    private String description;
    private String titleMediaUrl;
    @JsonProperty("isPublic")
    private boolean isPublic;
    private int creatorId;
    private List<QuestionDto> questions;
}
