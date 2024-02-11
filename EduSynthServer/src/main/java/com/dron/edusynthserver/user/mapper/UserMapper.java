package com.dron.edusynthserver.user.mapper;

import com.dron.edusynthserver.user.dto.UserDto;
import com.dron.edusynthserver.user.model.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper
{
    UserDto toDTO(User user);

    User toModel(UserDto userDto);

    List<UserDto> toDtoList(List<User> UserList);
}
