package com.dron.edusynthserver.Quiz.Model.Question.ChronoQuestion;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "chrono_events")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChronoEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private ChronoOrderQuestion question;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
}