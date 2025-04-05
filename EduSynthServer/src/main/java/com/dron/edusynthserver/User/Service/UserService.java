package com.dron.edusynthserver.User.Service;

import com.dron.edusynthserver.User.Dto.CredentialsDto;
import com.dron.edusynthserver.User.Dto.SignUpDto;
import com.dron.edusynthserver.User.Model.User;

// TODO: не должен сервис возвращать модели, он принимает dto, и возвращает dto
public interface UserService
{
    User requireUserById(Integer id);

    User login(CredentialsDto credentialsDto);

    User register(SignUpDto user);

    User createTemporaryUser(String name);
}
