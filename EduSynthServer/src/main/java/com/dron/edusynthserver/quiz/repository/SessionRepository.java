package com.dron.edusynthserver.quiz.repository;

import com.dron.edusynthserver.quiz.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer>
{
    Session findBySessionCode(String sessionCode);
}
