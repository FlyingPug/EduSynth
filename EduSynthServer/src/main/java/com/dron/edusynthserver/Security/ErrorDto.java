package com.dron.edusynthserver.Security;

public record ErrorDto(
        int statusCode,
        String codeError,
        String description
) {}
