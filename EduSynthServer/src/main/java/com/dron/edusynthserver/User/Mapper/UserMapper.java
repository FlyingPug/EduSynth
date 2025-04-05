package com.dron.edusynthserver.User.Mapper;

import com.dron.edusynthserver.User.Dto.UserDto;
import com.dron.edusynthserver.User.Model.User;
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
