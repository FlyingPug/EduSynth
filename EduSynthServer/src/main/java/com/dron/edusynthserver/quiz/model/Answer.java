package com.dron.edusynthserver.quiz.model;

import jakarta.persistence.*;

@Entity
@Table(name = "answers")
public class Answer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "question_id", nullable = false)
    private int questionId;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect;

    @Column(name = "media_url")
    private String mediaUrl;
}
