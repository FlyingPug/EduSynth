package com.dron.edusynthserver.Quiz.Dto.Response;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "questionType") // Jackson использует это поле для выбора класса
@JsonSubTypes({
        @JsonSubTypes.Type(value = SingleChoiceQuestionResponseDto.class, name = "SINGLE_CHOICE"),
        @JsonSubTypes.Type(value = TextInputQuestionResponseDto.class, name = "TEXT_INPUT"),
        @JsonSubTypes.Type(value = ChronoOrderQuestionResponseDto.class, name = "CHRONO_ORDER"),
        @JsonSubTypes.Type(value = MultipleChoiceQuestionResponseDto.class, name = "MULTIPLE"),
        @JsonSubTypes.Type(value = CrosswordQuestionResponseDto.class, name = "CROSSWORD")
})
public abstract class QuestionResponseDto {
    private int id;
    private String text;
    private String mediaUrl;
    private Integer timeLimitSeconds;
    private int quizId;
}