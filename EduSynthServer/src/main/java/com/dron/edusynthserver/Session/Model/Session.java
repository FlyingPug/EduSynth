package com.dron.edusynthserver.Session.Model;

import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/*
    TODO: отдели сущности от доменов
 */
@Entity
@Table(name = "sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    private Instant startTime;

    @Column(name = "current_question_index")
    private int currentQuestionIndex;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Participant> participants = new ArrayList<>();

    @Transient
    private Duration questionTimeLimit;

    public void start() {
        this.status = SessionStatus.ACTIVE;
        this.startTime = Instant.now();
        this.questionTimeLimit = Duration.ofSeconds(
                quiz.getQuestions().get(currentQuestionIndex).getTimeLimitSeconds()
        );
    }

    public boolean isTimeExpired() {
        if (SessionStatus.WAITING.equals(status) || SessionStatus.FINISHED.equals(status)) {
            return false;
        }
        return Duration.between(startTime, Instant.now())
                .compareTo(questionTimeLimit) >= 0;
    }

    public void moveToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= quiz.getQuestions().size()) {
            status = SessionStatus.FINISHED;
        } else {
            startTime = Instant.now();
            questionTimeLimit = Duration.ofSeconds(
                    quiz.getQuestions().get(currentQuestionIndex).getTimeLimitSeconds()
            );
        }
    }

    public Question getCurrentQuestion() {
        return quiz.getQuestions().get(currentQuestionIndex);
    }

    public void addParticipant(Participant participant) {
        participants.add(participant);
        participant.setSession(this);
    }
}