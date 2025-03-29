package com.dron.edusynthserver.quiz.Repository;

import com.dron.edusynthserver.quiz.Model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}
