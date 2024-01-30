package com.dron.edusynthserver.quiz.model;

import com.dron.edusynthserver.user.model.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "participants")
public class Participant
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "is_leader", nullable = false)
    private boolean isLeader;

    @ManyToMany
    @JoinTable(
            name = "participant_answers",
            joinColumns = @JoinColumn(name = "participant_id"),
            inverseJoinColumns = @JoinColumn(name = "answer_id"))
    private List<Answer> participantAnswers;

}
