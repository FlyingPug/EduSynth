package com.dron.edusynthserver.Session.Dto;

import lombok.Data;

import java.util.Set;

@Data
public class UserAnswerDto
{
    private int answerId;
    private Set<Integer> selectedIds;
    private int orderIndex;
    private String answer;
}
