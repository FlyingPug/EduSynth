package com.dron.edusynthserver.Quiz.Mapper;

import com.dron.edusynthserver.Quiz.Dto.Response.*;
import com.dron.edusynthserver.Quiz.Model.Question.ChronoQuestion.ChronoEvent;
import com.dron.edusynthserver.Quiz.Model.Question.ChronoQuestion.ChronoOrderQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.CrosswordQuestion.CrosswordCell;
import com.dron.edusynthserver.Quiz.Model.Question.CrosswordQuestion.CrosswordQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.MultipleChoiceQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Quiz.Model.Question.SingleChoiceQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.TextInputQuestion;
import com.dron.edusynthserver.Session.Model.SessionStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AnswersMapper.class})
public interface QuestionMapper
{
    default QuestionResponseDto toDto(Question question) {
        if (question instanceof SingleChoiceQuestion) {
            return map((SingleChoiceQuestion) question);
        } else if (question instanceof MultipleChoiceQuestion) {
            return map((MultipleChoiceQuestion) question);
        } else if (question instanceof TextInputQuestion) {
            return map((TextInputQuestion) question);
        } else if (question instanceof ChronoOrderQuestion) {
            return map((ChronoOrderQuestion) question);
        } else if (question instanceof CrosswordQuestion) {
            return map((CrosswordQuestion) question);
        }
        throw new IllegalArgumentException("Unknown question type");
    }

    @Mapping(target = "quizId", source = "quiz.id")
    SingleChoiceQuestionResponseDto map(SingleChoiceQuestion question);

    @Mapping(target = "quizId", source = "quiz.id")
    MultipleChoiceQuestionResponseDto map(MultipleChoiceQuestion question);

    @Mapping(target = "quizId", source = "quiz.id")
    @Mapping(target = "answerLength", expression = "java(question.getCorrectAnswer().length())")
    TextInputQuestionResponseDto map(TextInputQuestion question);

    @Mapping(target = "quizId", source = "quiz.id")
    ChronoOrderQuestionResponseDto map(ChronoOrderQuestion question);

    @Mapping(target = "quizId", source = "quiz.id")
    CrosswordQuestionResponseDto map(CrosswordQuestion question);

    ChronoEventResponseDto map(ChronoEvent event);

    @Mapping(target = "length", expression = "java(cell.getCorrectText().length())")
    CrosswordCellResponseDto map(CrosswordCell cell);
}
