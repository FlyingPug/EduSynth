package com.dron.edusynthserver.Quiz.Dto.Request;

import lombok.Data;

@Data
public class CrosswordCellRequestDto {
    private String correctText;
    private Integer positionX;
    private Integer positionY;
}