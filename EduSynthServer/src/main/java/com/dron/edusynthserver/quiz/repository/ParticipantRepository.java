package com.dron.edusynthserver.quiz.repository;

import com.dron.edusynthserver.quiz.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {
}
