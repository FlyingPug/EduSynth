package com.dron.edusynthserver.Session.Model;

import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Session {
    @Id
    private String id;

    @ManyToOne()
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    private Instant startTime;

    @Column(name = "current_question_index")
    private int currentQuestionIndex;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Participant> participants = new ArrayList<>();

    public Duration getQuestionTimeLimit() {
        return Duration.ofSeconds(
                quiz.getQuestions().get(currentQuestionIndex).getTimeLimitSeconds()
        );
    }

    public void start() {
        this.status = SessionStatus.ACTIVE;
        this.startTime = Instant.now();
    }

    public boolean isTimeExpired() {
        if (SessionStatus.WAITING.equals(status) || SessionStatus.FINISHED.equals(status)) {
            return false;
        }
        return Duration.between(startTime, Instant.now())
                .compareTo(getQuestionTimeLimit()) >= 0;
    }

    public void checkIfAllParticipantsHaveAnswered() {
        if (participants.stream().allMatch(p -> p.hasAnswered(getCurrentQuestion()))) {
            moveToNextQuestion();
        }
    }

    public void moveToNextQuestion() {
        if (currentQuestionIndex + 1 >= quiz.getQuestions().size()) {
            status = SessionStatus.FINISHED;
        } else {
            currentQuestionIndex++;
            startTime = Instant.now();
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