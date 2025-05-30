package com.dron.edusynthserver.Quiz.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizTitleDto
{
    private int id;
    private String title;
    private String titleMediaUrl;
    private String description;
}
