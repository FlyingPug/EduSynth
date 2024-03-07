package com.dron.edusynthserver.session.repository;

import com.dron.edusynthserver.session.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer>
{
    Session findBySessionCode(String sessionCode);
}
