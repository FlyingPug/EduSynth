package com.dron.edusynthserver.Quiz.Dto.Response;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "questionType") // Jackson использует это поле для выбора класса
@JsonSubTypes({
        @JsonSubTypes.Type(value = SingleChoiceQuestionResponseDto.class, name = "CHOOSE_OPTION"),
        @JsonSubTypes.Type(value = TextInputQuestionResponseDto.class, name = "INPUT_TEXT"),
        @JsonSubTypes.Type(value = ChronoOrderQuestionResponseDto.class, name = "CHRONO"),
        @JsonSubTypes.Type(value = MultipleChoiceQuestionResponseDto.class, name = "CHOOSE_MULTIPLE_OPTIONS"),
        @JsonSubTypes.Type(value = CrosswordQuestionResponseDto.class, name = "CROSSWORD")
})
public abstract class QuestionResponseDto {
    private int id;
    private String text;
    private String mediaUrl;
    private Integer timeLimitSeconds;
    private int quizId;
}