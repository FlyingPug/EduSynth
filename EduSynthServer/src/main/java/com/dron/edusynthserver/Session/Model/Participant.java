package com.dron.edusynthserver.Session.Model;

import com.dron.edusynthserver.Quiz.Model.Answer;
import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.User.Model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "participants")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_leader")
    private boolean isLeader;

    private int score;

    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ParticipantAnswer> answers = new ArrayList<>();

    public void incrementScore() {
        this.score++;
    }

    public boolean hasAnswered(Question question) {
        return answers.stream()
                .anyMatch(a -> a.getQuestion().equals(question));
    }
}
