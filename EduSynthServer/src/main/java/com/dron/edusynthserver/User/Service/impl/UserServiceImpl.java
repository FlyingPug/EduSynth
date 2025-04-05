package com.dron.edusynthserver.User.Service.impl;

import com.dron.edusynthserver.Exceptions.IncorrectCredentials;
import com.dron.edusynthserver.Exceptions.NotFoundException;
import com.dron.edusynthserver.Exceptions.UserAlreadyExistsException;
import com.dron.edusynthserver.User.Dto.CredentialsDto;
import com.dron.edusynthserver.User.Dto.SignUpDto;
import com.dron.edusynthserver.User.Model.Role;
import com.dron.edusynthserver.User.Model.User;
import com.dron.edusynthserver.User.Repository.UserRepository;
import com.dron.edusynthserver.User.Service.PasswordEncoderService;
import com.dron.edusynthserver.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    public User requireUserById(Integer id) {
        var user = userRepository.findById(id);

        if (user.isEmpty()) throw new NotFoundException("User with id " + id + " not found");

        return user.get();
    }

    @Override
    public User login(CredentialsDto credentialsDto)
    {
        var user = userRepository.findByEmail(credentialsDto.email());

        if (user.isEmpty() || !passwordEncoderService.VerifyHash(credentialsDto.password(), user.get().getSalt(), user.get().getPasswordHash()))
        {
            throw new IncorrectCredentials();
        }

        return user.get();
    }

    @Override
    public User register(SignUpDto userDto) {
        var exists = userRepository.existsByEmail(userDto.email());

        if (exists) throw new UserAlreadyExistsException();

        String salt = passwordEncoderService.GenerateSalt();
        var user = User.builder()
                .email(userDto.email())
                .salt(salt)
                .passwordHash(passwordEncoderService.CalculateHash(userDto.password(), salt))
                .username(userDto.name())
                .role(userDto.role())
                .build();

        return userRepository.save(user);
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
