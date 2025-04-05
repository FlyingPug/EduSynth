package com.dron.edusynthserver.Quiz.Repository;

import com.dron.edusynthserver.Quiz.Model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}
