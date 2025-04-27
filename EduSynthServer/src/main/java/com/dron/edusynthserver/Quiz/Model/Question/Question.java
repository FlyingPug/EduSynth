package com.dron.edusynthserver.Quiz.Model.Question;

import com.dron.edusynthserver.Quiz.Model.Answer;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import com.dron.edusynthserver.Session.Model.ParticipantAnswer;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "question_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;

    @Column(name = "text", nullable = false)
    protected String text;

    @Column(name = "media_url")
    protected String mediaUrl;

    @Column(name = "time_limit_seconds")
    protected Integer timeLimitSeconds;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    protected Quiz quiz;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return id == question.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    public abstract boolean isAnswerCorrect(List<ParticipantAnswer> participantAnswers);
}