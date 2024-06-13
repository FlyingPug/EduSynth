package com.dron.edusynthserver.user.dto;

import com.dron.edusynthserver.user.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;

    private String username;
    
    private String token;

    private String email;

    private Role role;

    private long balance = 0;

    private String profilePictureUrl;
}
