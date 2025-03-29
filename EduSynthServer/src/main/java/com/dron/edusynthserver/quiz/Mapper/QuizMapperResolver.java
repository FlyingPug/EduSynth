package com.dron.edusynthserver.quiz.Mapper;

import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.Model.Quiz;
import com.dron.edusynthserver.quiz.Repository.QuizRepository;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QuizMapperResolver {
    @Autowired
    private QuizRepository userRepository;

    @ObjectFactory
    public Quiz resolve(QuizDto dto, @TargetType Class<Quiz> type) {
        return userRepository.getReferenceById(dto.getId());
    }
}
