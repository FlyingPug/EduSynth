package com.dron.edusynthserver.Quiz.Service;

import com.dron.edusynthserver.Exceptions.NotFoundException;
import com.dron.edusynthserver.Quiz.Mapper.QuestionMapper;
import com.dron.edusynthserver.Quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.Quiz.Dto.Request.QuizRequestDto;
import com.dron.edusynthserver.Quiz.Dto.QuizTitleDto;
import com.dron.edusynthserver.Quiz.Model.Factory.QuestionFactory;
import com.dron.edusynthserver.Quiz.Model.Question.Question;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import com.dron.edusynthserver.Quiz.Repository.QuizRepository;
import com.dron.edusynthserver.User.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final UserService userService;
    private final QuestionFactory questionFactory;

    @Override
    public Quiz getQuizById(Integer quizId) {
        return quizRepository.findById(quizId).orElse(null);
    }

    @Override
    public Quiz requireQuizById(Integer quizId) {
        Quiz quiz = getQuizById(quizId);
        if (quiz == null) throw new NotFoundException("Test is not found");
        return quiz;
    }

    @Override
    public Quiz createQuiz(QuizRequestDto quizDto, Integer creatorId) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDto.getTitle());
        quiz.setCreator(userService.requireUserById(creatorId));

        List<Question> questions = quizDto.getQuestions().stream()
                .map(dto -> questionFactory.createQuestion(dto, quiz))
                .toList();

        quiz.setQuestions(questions);
        return quizRepository.save(quiz);
    }

    @Override
    public Page<Quiz> query(int page, int size, String sortBy) {
        PageRequest pageRequest = PageRequest.of(page, size);

        return quizRepository.findAll(pageRequest);
    }

    @Override
    public void deleteQuizById(int toIntExact) {
        quizRepository.deleteById(toIntExact);
    }
}
