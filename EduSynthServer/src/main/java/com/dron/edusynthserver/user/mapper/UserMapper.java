package com.dron.edusynthserver.user.mapper;

import com.dron.edusynthserver.user.dto.UserDto;
import com.dron.edusynthserver.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper
{
    @Mapping(target = "token", ignore = true)
    UserDto toDTO(User user);

    List<UserDto> toDtoList(List<User> UserList);
}
