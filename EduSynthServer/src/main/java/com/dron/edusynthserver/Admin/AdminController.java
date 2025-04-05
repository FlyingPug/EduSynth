package com.dron.edusynthserver.Admin;

import com.dron.edusynthserver.Quiz.Dto.Response.QuizResponseDto;
import com.dron.edusynthserver.Session.Dto.SessionDto;
import com.dron.edusynthserver.User.Dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    @PutMapping("/users/{userId}/grant-admin")
    public ResponseEntity<UserDto> grantAdminRole(@PathVariable int userId) {
        return ResponseEntity.ok(adminService.grantAdminRole(userId));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/quizzes/{quizId}/approve")
    public ResponseEntity<QuizResponseDto> approveQuiz(@PathVariable int quizId) {
        return ResponseEntity.ok(adminService.approveQuiz(quizId));
    }

    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable int quizId) {
        adminService.deleteQuiz(quizId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/sessions/{sessionId}/terminate")
    public ResponseEntity<SessionDto> terminateSession(@PathVariable String sessionId) {
        return ResponseEntity.ok(adminService.terminateSession(sessionId));
    }
}
