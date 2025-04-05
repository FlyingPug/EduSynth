package com.dron.edusynthserver.Quiz.Model;

import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Session.Model.Participant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "answers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Answer
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    /*
    В случае выбора вариант ответа, сюда записывает текст вопроса, в случае ввода, сюда записывается правильный ответ
     */
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect;

    @Column(name = "media_url")
    private String mediaUrl;
}
