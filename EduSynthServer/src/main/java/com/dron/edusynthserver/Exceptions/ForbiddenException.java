package com.dron.edusynthserver.Exceptions;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException(String message) {
        super(message);
    }

    public ForbiddenException() {
        super("У вас нет доступа для этого");
    }
}
