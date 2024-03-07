package com.dron.edusynthserver.session.repository;

import com.dron.edusynthserver.session.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer>
{
    Optional<Participant> findParticipantByUser_Username(String name);
}

