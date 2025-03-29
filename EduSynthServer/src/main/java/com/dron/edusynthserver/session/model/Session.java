package com.dron.edusynthserver.session.model;

import com.dron.edusynthserver.quiz.Model.Quiz;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "sessions")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Participant> participants = Collections.emptyList();

    @Column(name = "session_code", nullable = false, unique = true)
    private String sessionCode;

    @Enumerated(EnumType.STRING)
    private SessionState sessionState;

    @Column(name = "current_question_index")
    private int currentQuestionIndex = 0;

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", quiz=" + quiz +
                ", startTime=" + startTime +
                ", sessionCode='" + sessionCode + '\'' +
                ", sessionState=" + sessionState +
                '}';
    }

    public void AddParticipant(Participant participant)
    {
        participants.add(participant);
    }
}
