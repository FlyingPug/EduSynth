package com.dron.edusynthserver.Quiz.Model.Question.CrosswordQuestion;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "crossword_cells")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CrosswordCell {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private CrosswordQuestion question;

    @Column(name = "correct_text", nullable = false)
    private String correctText;

    @Column(name = "position_x", nullable = false)
    private Integer positionX;

    @Column(name = "position_y", nullable = false)
    private Integer positionY;
}