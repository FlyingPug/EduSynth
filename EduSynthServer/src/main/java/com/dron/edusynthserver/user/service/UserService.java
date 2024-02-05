package com.dron.edusynthserver.user.service;

import com.dron.edusynthserver.user.dto.CredentialsDto;
import com.dron.edusynthserver.user.dto.SignUpDto;
import com.dron.edusynthserver.user.dto.UserDto;
import com.dron.edusynthserver.user.model.User;

public interface UserService
{
    User getUserByName(String name);

    UserDto getUserByEmail(String email);

    UserDto login(CredentialsDto credentialsDto);

    UserDto register(SignUpDto user);
}
