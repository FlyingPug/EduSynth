package com.dron.edusynthserver.Admin;

import com.dron.edusynthserver.Exceptions.ForbiddenException;
import com.dron.edusynthserver.Exceptions.NotFoundException;
import com.dron.edusynthserver.Quiz.Dto.Response.QuizResponseDto;
import com.dron.edusynthserver.Quiz.Mapper.QuizMapper;
import com.dron.edusynthserver.Quiz.Model.Quiz;
import com.dron.edusynthserver.Quiz.Repository.QuizRepository;
import com.dron.edusynthserver.Session.Dto.SessionDto;
import com.dron.edusynthserver.Session.Mapper.SessionMapper;
import com.dron.edusynthserver.Session.Model.Session;
import com.dron.edusynthserver.Session.Repository.SessionRepository;
import com.dron.edusynthserver.User.Dto.UserDto;
import com.dron.edusynthserver.User.Mapper.UserMapper;
import com.dron.edusynthserver.User.Model.Role;
import com.dron.edusynthserver.User.Model.User;
import com.dron.edusynthserver.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService
{
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final SessionRepository sessionRepository;
    private final UserMapper userMapper;
    private final QuizMapper quizMapper;
    private final SessionMapper sessionMapper;

    @Override
    public UserDto grantAdminRole(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        user.setRole(Role.ADMIN);
        return userMapper.toDTO(userRepository.save(user));
    }

    @Override
    public void deleteUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (user.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Cannot delete super admin");
        }

        userRepository.delete(user);
    }

    @Override
    public QuizResponseDto approveQuiz(int quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new NotFoundException("Quiz not found"));

        return quizMapper.toDTO(quizRepository.save(quiz));
    }

    @Override
    public void deleteQuiz(int quizId) {
        quizRepository.deleteById(quizId);
    }

    @Override
    public SessionDto terminateSession(String sessionId) {
        Session session = sessionRepository.findSessionById(sessionId)
                .orElseThrow(() -> new NotFoundException("Session not found"));

        return sessionMapper.toSessionDto(sessionRepository.save(session));
    }
}
