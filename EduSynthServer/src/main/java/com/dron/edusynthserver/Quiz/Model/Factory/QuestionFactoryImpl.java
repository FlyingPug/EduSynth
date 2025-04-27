package com.dron.edusynthserver.Quiz.Model.Factory;

import com.dron.edusynthserver.Quiz.Dto.Request.*;
import com.dron.edusynthserver.Quiz.Model.Answer;
import com.dron.edusynthserver.Quiz.Model.Question.ChronoQuestion.ChronoEvent;
import com.dron.edusynthserver.Quiz.Model.Question.ChronoQuestion.ChronoOrderQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.CrosswordQuestion.CrosswordCell;
import com.dron.edusynthserver.Quiz.Model.Question.CrosswordQuestion.CrosswordQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.MultipleChoiceQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Quiz.Model.Question.SingleChoiceQuestion;
import com.dron.edusynthserver.Quiz.Model.Question.TextInputQuestion;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionFactoryImpl implements QuestionFactory {

    public Question createQuestion(QuestionRequestDto dto, Quiz quiz) {
        if (dto instanceof SingleChoiceQuestionRequestDto) {
            return createSingleChoice((SingleChoiceQuestionRequestDto) dto, quiz);
        } else if (dto instanceof MultipleChoiceQuestionRequestDto) {
            return createMultipleChoice((MultipleChoiceQuestionRequestDto) dto, quiz);
        } else if (dto instanceof TextInputQuestionRequestDto) {
            return createTextInput((TextInputQuestionRequestDto) dto, quiz);
        } else if (dto instanceof ChronoOrderQuestionRequestDto) {
            return createChronoOrder((ChronoOrderQuestionRequestDto) dto, quiz);
        } else if (dto instanceof CrosswordQuestionRequestDto) {
            return createCrossword((CrosswordQuestionRequestDto) dto, quiz);
        } else {
            throw new IllegalArgumentException("Unknown question type: " + dto.getClass());
        }
    }

    private SingleChoiceQuestion createSingleChoice(SingleChoiceQuestionRequestDto dto, Quiz quiz) {
        SingleChoiceQuestion question = new SingleChoiceQuestion();
        mapBaseFields(dto, question, quiz);

        List<Answer> answers = dto.getAnswers().stream()
                .map(this::createAnswer)
                .peek(a -> a.setQuestion(question))
                .toList();

        question.setAnswers(answers);
        return question;
    }

    private MultipleChoiceQuestion createMultipleChoice(MultipleChoiceQuestionRequestDto dto, Quiz quiz) {
        MultipleChoiceQuestion question = new MultipleChoiceQuestion();
        mapBaseFields(dto, question, quiz);

        List<Answer> answers = dto.getAnswers().stream()
                .map(this::createAnswer)
                .peek(a -> a.setQuestion(question))
                .toList();

        question.setAnswers(answers);
        return question;
    }

    private TextInputQuestion createTextInput(TextInputQuestionRequestDto dto, Quiz quiz) {
        TextInputQuestion question = new TextInputQuestion();
        mapBaseFields(dto, question, quiz);
        question.setCorrectAnswer(dto.getCorrectAnswer());
        return question;
    }

    private ChronoOrderQuestion createChronoOrder(ChronoOrderQuestionRequestDto dto, Quiz quiz) {
        ChronoOrderQuestion question = new ChronoOrderQuestion();
        mapBaseFields(dto, question, quiz);

        List<ChronoEvent> events = dto.getEvents().stream()
                .map(this::createChronoEvent)
                .peek(e -> e.setQuestion(question))
                .toList();

        question.setEvents(events);
        return question;
    }

    private CrosswordQuestion createCrossword(CrosswordQuestionRequestDto dto, Quiz quiz) {
        CrosswordQuestion question = new CrosswordQuestion();
        mapBaseFields(dto, question, quiz);

        List<CrosswordCell> cells = dto.getCrosswordCells().stream()
                .map(this::createCrosswordCell)
                .peek(c -> c.setQuestion(question))
                .toList();

        question.setCrosswordCells(cells);
        return question;
    }

    private void mapBaseFields(QuestionRequestDto dto, Question entity, Quiz quiz) {
        entity.setText(dto.getText());
        entity.setMediaUrl(dto.getMediaUrl());
        entity.setTimeLimitSeconds(dto.getTimeLimitSeconds());
        entity.setQuiz(quiz);
    }

    private Answer createAnswer(AnswerRequestDto dto) {
        Answer answer = new Answer();
        answer.setText(dto.getText());
        answer.setCorrect(dto.isCorrect());
        answer.setMediaUrl(dto.getMediaUrl());
        return answer;
    }

    private ChronoEvent createChronoEvent(ChronoEventRequestDto dto) {
        ChronoEvent event = new ChronoEvent();
        event.setText(dto.getText());
        event.setOrderIndex(dto.getOrderIndex());
        return event;
    }

    private CrosswordCell createCrosswordCell(CrosswordCellRequestDto dto) {
        CrosswordCell cell = new CrosswordCell();
        cell.setCorrectText(dto.getCorrectText());
        cell.setPositionX(dto.getPositionX());
        cell.setPositionY(dto.getPositionY());
        return cell;
    }
}