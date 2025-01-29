package com.dron.edusynthserver.security;

import lombok.AllArgsConstructor;
import lombok.Data;

public record ErrorDto(
        int statusCode,
        String codeError,
        String description
) {}
