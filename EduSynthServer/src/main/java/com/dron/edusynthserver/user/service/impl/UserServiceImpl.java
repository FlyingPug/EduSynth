package com.dron.edusynthserver.user.service.impl;

import com.dron.edusynthserver.exceptions.IncorrectCredentials;
import com.dron.edusynthserver.exceptions.UserAlreadyExistsException;
import com.dron.edusynthserver.user.dto.CredentialsDto;
import com.dron.edusynthserver.user.dto.SignUpDto;
import com.dron.edusynthserver.user.model.User;
import com.dron.edusynthserver.user.repository.UserRepository;
import com.dron.edusynthserver.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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

        if (user == null || !Objects.equals(user.getPassword(), credentialsDto.password()))
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
            user = User.builder()
                    .email(userDto.email())
                    .password(userDto.password())
                    .username(userDto.name())
                    .role(userDto.role())
                    .build();

            user = userRepository.save(user);

            return user;
        }

        throw new UserAlreadyExistsException();
    }
}
