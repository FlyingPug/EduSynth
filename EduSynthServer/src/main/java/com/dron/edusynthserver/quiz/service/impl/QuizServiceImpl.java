package com.dron.edusynthserver.quiz.service.impl;

import com.dron.edusynthserver.quiz.Mapper.QuestionMapper;
import com.dron.edusynthserver.quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.quiz.dto.QuestionDto;
import com.dron.edusynthserver.quiz.dto.QuizDto;
import com.dron.edusynthserver.quiz.dto.QuizTitleDto;
import com.dron.edusynthserver.quiz.model.Quiz;
import com.dron.edusynthserver.quiz.repository.QuizRepository;
import com.dron.edusynthserver.quiz.service.QuizService;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    QuizRepository quizRepository;
    QuizMapper quizMapper;
    QuestionMapper questionMapper;
    UserService userService;

    @Autowired
    public QuizServiceImpl(QuizRepository quizRepository, QuizMapper quizMapper, UserService userService, QuestionMapper questionMapper)
    {
        this.quizRepository = quizRepository;
        this.quizMapper = quizMapper;
        this.userService = userService;
        this.questionMapper = questionMapper;
    }

    @Override
    public Quiz getQuizById(Integer quizId) {
        return quizRepository.findById(quizId).orElse(null);
    }

    @Override
    public Quiz createQuiz(QuizDto quizDto, String creatorUsername) {
        Quiz quiz = quizMapper.toModel(quizDto);
        quiz.setCreatorId(userService.getUserByName(creatorUsername).getId());

        return quizRepository.save(quiz);
    }

    @Override
    public QuestionDto getQuestion(int questionNumb, int quizId) {
        return questionMapper.toDTO(quizRepository.getReferenceById(quizId).getQuestions().get(questionNumb));
    }

    @Override
    public Page<QuizTitleDto> getQuizTitles(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);

        return quizRepository.findAll(pageRequest).map(quizMapper::toShortDto);
    }
}
