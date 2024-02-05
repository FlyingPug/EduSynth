package com.dron.edusynthserver.quiz.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "sessions")
@Builder
@Data
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(name = "start_time", nullable = false)
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<Participant> participants;

    @Column(name = "session_code", nullable = false, unique = true)
    private String sessionCode;
}
