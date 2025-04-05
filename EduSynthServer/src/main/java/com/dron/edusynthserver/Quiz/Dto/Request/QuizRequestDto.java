package com.dron.edusynthserver.Quiz.Dto.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class QuizRequestDto
{
    private int id;
    private String title;
    private String description;
    private String titleMediaUrl;
    @JsonProperty("isPublic")
    private boolean isPublic;
    private List<QuestionRequestDto> questions;
}
