package com.dron.edusynthserver.Quiz.Dto.Request;

import com.dron.edusynthserver.Quiz.Dto.QuestionTypeDto;
import com.dron.edusynthserver.Quiz.Model.Question.QuestionType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "questionType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = SingleChoiceQuestionRequestDto.class, name = "SINGLE_CHOICE"),
        @JsonSubTypes.Type(value = TextInputQuestionRequestDto.class, name = "TEXT_INPUT"),
        @JsonSubTypes.Type(value = ChronoOrderQuestionRequestDto.class, name = "CHRONO_ORDER"),
        @JsonSubTypes.Type(value = MultipleChoiceQuestionRequestDto.class, name = "MULTIPLE"),
        @JsonSubTypes.Type(value = CrosswordQuestionRequestDto.class, name = "CROSSWORD")
})
public abstract class QuestionRequestDto {
    private String text;
    private String mediaUrl;
    private Integer timeLimitSeconds;
    private String questionType;

    public abstract QuestionTypeDto getQuestionType();
}