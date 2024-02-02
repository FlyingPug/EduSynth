package com.dron.edusynthserver.user.service;

import com.dron.edusynthserver.user.dto.UserDto;
import com.dron.edusynthserver.user.model.User;

public interface UserService
{
    User getUserByName(String name);

    UserDto getUserByEmail(String email);
}
