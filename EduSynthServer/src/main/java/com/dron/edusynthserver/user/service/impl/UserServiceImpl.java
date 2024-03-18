package com.dron.edusynthserver.user.service.impl;

import com.dron.edusynthserver.exceptions.IncorrectCredentials;
import com.dron.edusynthserver.exceptions.UserAlreadyExistsException;
import com.dron.edusynthserver.user.dto.CredentialsDto;
import com.dron.edusynthserver.user.dto.SignUpDto;
import com.dron.edusynthserver.user.model.Role;
import com.dron.edusynthserver.user.model.User;
import com.dron.edusynthserver.user.repository.UserRepository;
import com.dron.edusynthserver.user.service.PasswordEncoderService;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    PasswordEncoderService passwordEncoderService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoderService passwordEncoderService) {
        this.userRepository = userRepository;
        this.passwordEncoderService = passwordEncoderService;
    }

    @Override
    public User getUserByName(String name) {
        return userRepository.findByUsername(name);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User login(CredentialsDto credentialsDto)
    {
        User user = userRepository.findByEmail(credentialsDto.email());

        if (user == null || !passwordEncoderService.VerifyHash(credentialsDto.password(), user.getSalt(), user.getPasswordHash()))
        {
            throw new IncorrectCredentials();
        }

        return user;
    }

    @Override
    public User register(SignUpDto userDto) {
        User user = userRepository.findByEmail(userDto.email());

        if (user == null)
        {
            String salt = passwordEncoderService.GenerateSalt();
            user = User.builder()
                    .email(userDto.email())
                    .salt(salt)
                    .passwordHash(passwordEncoderService.CalculateHash(userDto.password(), salt))
                    .username(userDto.name())
                    .role(userDto.role())
                    .build();

            return userRepository.save(user);
        }

        throw new UserAlreadyExistsException();
    }

    @Override
    public User createTemporaryUser(String name) {
        User mockUser = User.builder()
                .username(name)
                .role(Role.STUDENT_TEMP)
                .email("")
                .salt("")
                .passwordHash("")
                .build();

        return userRepository.save(mockUser);
    }
}
