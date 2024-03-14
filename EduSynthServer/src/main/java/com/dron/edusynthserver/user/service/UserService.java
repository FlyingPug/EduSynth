package com.dron.edusynthserver.user.service;

import com.dron.edusynthserver.user.dto.CredentialsDto;
import com.dron.edusynthserver.user.dto.SignUpDto;
import com.dron.edusynthserver.user.dto.UserDto;
import com.dron.edusynthserver.user.model.User;

// TODO: не должен сервис возвращать модели, он принимает dto, и возвращает dto
public interface UserService
{
    User getUserByName(String name);

    User getUserByEmail(String email);

    User login(CredentialsDto credentialsDto);

    User register(SignUpDto user);

    User createTemporaryUser(String name);
}
