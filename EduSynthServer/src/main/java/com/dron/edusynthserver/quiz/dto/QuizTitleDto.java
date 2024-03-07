package com.dron.edusynthserver.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizTitleDto
{
    private String title;
    private String title_media_url;
    private String description;
}
