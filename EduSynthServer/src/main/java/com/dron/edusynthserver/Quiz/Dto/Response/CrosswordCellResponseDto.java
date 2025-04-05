package com.dron.edusynthserver.Quiz.Dto.Response;

import lombok.Data;

@Data
public class CrosswordCellResponseDto {
    private Integer id;
    private Integer length;
    private Integer positionX;
    private Integer positionY;
}