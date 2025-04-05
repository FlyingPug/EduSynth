package com.dron.edusynthserver.Admin;

import com.dron.edusynthserver.Quiz.Dto.Response.QuizResponseDto;
import com.dron.edusynthserver.Session.Dto.SessionDto;
import com.dron.edusynthserver.User.Dto.UserDto;

public interface AdminService {
    UserDto grantAdminRole(int userId);
    void deleteUser(int userId);
    QuizResponseDto approveQuiz(int quizId);
    void deleteQuiz(int quizId);
    SessionDto terminateSession(String sessionId);
}
