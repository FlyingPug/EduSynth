package com.dron.edusynthserver.quiz.repository;

import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}
