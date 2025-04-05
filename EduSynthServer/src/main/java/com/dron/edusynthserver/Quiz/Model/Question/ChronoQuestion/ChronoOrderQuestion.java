package com.dron.edusynthserver.Quiz.Model.Question.ChronoQuestion;

import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Comparator;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("CHRONO_ORDER")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChronoOrderQuestion extends Question {
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChronoEvent> events;

    @Override
    public boolean isAnswerCorrect(List<ParticipantAnswer> answers) {
        List<String> correctOrder = events.stream()
                .sorted(Comparator.comparing(ChronoEvent::getOrderIndex))
                .map(ChronoEvent::getText)
                .toList();

        List<String> userOrder = answers.stream()
                .sorted(Comparator.comparing(ParticipantAnswer::getOrderIndex))
                .map(ParticipantAnswer::getAnswer)
                .toList();

        return correctOrder.equals(userOrder);
    }
}
