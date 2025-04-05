package com.dron.edusynthserver.User.Dto;

import com.dron.edusynthserver.User.Model.Role;

public record SignUpDto (String email, String name, String password, Role role) {}
