package com.dron.edusynthserver.Quiz.Model.Question;

import com.dron.edusynthserver.Exceptions.ForbiddenException;
import com.dron.edusynthserver.Exceptions.UnexpectedException;
import com.dron.edusynthserver.Quiz.Model.Answer;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("SINGLE_CHOICE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SingleChoiceQuestion extends Question {
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;

    @Override
    public boolean isAnswerCorrect(List<ParticipantAnswer> participantAnswers) {
        var correctAnswer = answers.stream().filter(Answer::isCorrect).findFirst();
        if (correctAnswer.isEmpty()) throw new UnexpectedException("Not a single correct answer found");
        return correctAnswer.get().getId() == participantAnswers.get(0).getAnswerId();
    }
}
