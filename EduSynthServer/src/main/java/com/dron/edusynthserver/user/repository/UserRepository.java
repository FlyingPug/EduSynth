package com.dron.edusynthserver.user.repository;

import org.springframework.stereotype.Repository;
import com.dron.edusynthserver.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findById(int id);
    User findByUsername(String username);
    User findByEmail(String email);
}
