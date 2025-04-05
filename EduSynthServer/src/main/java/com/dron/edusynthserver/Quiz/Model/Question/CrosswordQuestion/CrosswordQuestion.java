package com.dron.edusynthserver.Quiz.Model.Question.CrosswordQuestion;

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

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("CROSSWORD")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrosswordQuestion extends Question {
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CrosswordCell> crosswordCells;

    @Override
    public boolean isAnswerCorrect(List<ParticipantAnswer> answers) {
        return answers.stream().allMatch(answerDto ->
                crosswordCells.stream().anyMatch(cell -> cell.getCorrectText().equalsIgnoreCase(answerDto.getAnswer()))
        );
    }
}