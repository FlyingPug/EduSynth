package com.dron.edusynthserver.user.dto;

import com.dron.edusynthserver.user.model.Role;

public record SignUpDto (String email, String name, String password, Role role) {}
