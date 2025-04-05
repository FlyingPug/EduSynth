package com.dron.edusynthserver.Quiz.Model.Question;

import com.dron.edusynthserver.Quiz.Model.Answer;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("MULTIPLE_CHOICE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MultipleChoiceQuestion extends Question {
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;

    @Override
    public boolean isAnswerCorrect(List<ParticipantAnswer> participantAnswers) {
        Set<Integer> correctAnswerIds = answers.stream()
                .filter(Answer::isCorrect)
                .map(Answer::getId)
                .collect(Collectors.toSet());

        Set<Integer> userAnswerIds = participantAnswers.stream()
                .map(ParticipantAnswer::getAnswerId)
                .collect(Collectors.toSet());

        return correctAnswerIds.equals(userAnswerIds);
    }
}