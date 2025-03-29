package com.dron.edusynthserver.quiz.Repository;

import com.dron.edusynthserver.quiz.Model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswersRepository extends JpaRepository<Answer, Integer> {
}
