package com.dron.edusynthserver.session.model;

import com.dron.edusynthserver.quiz.Model.Answer;
import com.dron.edusynthserver.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "participants")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Participant
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "is_leader", nullable = false)
    private boolean isLeader;

    @Column(name = "score", nullable = false)
    private int Score;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "participant_answers",
            joinColumns = @JoinColumn(name = "participant_id"),
            inverseJoinColumns = @JoinColumn(name = "answer_id"))
    private List<Answer> participantAnswers;

}
