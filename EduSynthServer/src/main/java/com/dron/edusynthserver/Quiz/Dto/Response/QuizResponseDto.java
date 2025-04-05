package com.dron.edusynthserver.Quiz.Dto.Response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class QuizResponseDto
{
    private int id;
    private String title;
    private String description;
    private String titleMediaUrl;
    @JsonProperty("isPublic")
    private boolean isPublic;
    private int creatorId;
    private List<QuestionResponseDto> questions;
}
