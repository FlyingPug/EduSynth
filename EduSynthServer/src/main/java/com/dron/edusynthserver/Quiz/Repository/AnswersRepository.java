package com.dron.edusynthserver.Quiz.Repository;

import com.dron.edusynthserver.Quiz.Model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswersRepository extends JpaRepository<Answer, Integer> {
}
