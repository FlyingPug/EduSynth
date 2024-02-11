package com.dron.edusynthserver.quiz.repository;

import com.dron.edusynthserver.quiz.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswersRepository  extends JpaRepository<Answer, Integer> {
}
