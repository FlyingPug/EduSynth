package com.dron.edusynthserver.Session.Repository;

import com.dron.edusynthserver.Session.Model.Session;
import com.dron.edusynthserver.Session.Model.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer>
{
    Optional<Session> findSessionById(String id);
}
