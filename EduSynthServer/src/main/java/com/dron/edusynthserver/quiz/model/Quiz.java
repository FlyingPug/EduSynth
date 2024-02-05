package com.dron.edusynthserver.quiz.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Quiz
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic;

    @Column(name = "creator_id", nullable = false)
    private int creatorId;

    @Column(name = "title_media_url")
    private String titleMediaUrl;
    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;
}
