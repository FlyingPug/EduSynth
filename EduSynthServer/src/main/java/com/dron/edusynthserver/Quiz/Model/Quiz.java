package com.dron.edusynthserver.Quiz.Model;

import com.dron.edusynthserver.Common.Model.OwnedEntity;
import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.User.Model.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "quizzes")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Quiz implements OwnedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @Column(name = "title_media_url")
    private String titleMediaUrl;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    @Override
    public String getOwnerUsername() {
        return this.creator.getUsername();
    }
}