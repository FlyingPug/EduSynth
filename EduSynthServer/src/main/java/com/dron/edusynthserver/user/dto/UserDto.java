package com.dron.edusynthserver.user.dto;

import com.dron.edusynthserver.user.model.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
    private String username;

    private String token;

    private String email;

    private Role role;
}
