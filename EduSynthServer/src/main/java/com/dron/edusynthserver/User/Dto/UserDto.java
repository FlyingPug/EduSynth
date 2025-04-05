package com.dron.edusynthserver.User.Dto;

import com.dron.edusynthserver.User.Model.Role;
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

    private long balance;

    private String profilePictureUrl;
}
