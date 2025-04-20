package com.dron.edusynthserver.Quiz.Model.Question;

import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("TEXT_INPUT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TextInputQuestion extends Question {
    @Column(name = "correct_answer")
    private String correctAnswer;

    @Override
    public boolean isAnswerCorrect(List<ParticipantAnswer> answers) {
        return answers.size() == 1 && answers.get(0).getAnswer().equalsIgnoreCase(correctAnswer);
    }
}