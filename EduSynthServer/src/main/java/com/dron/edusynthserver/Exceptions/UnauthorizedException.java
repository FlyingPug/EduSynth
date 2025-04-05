package com.dron.edusynthserver.Exceptions;

public class UnauthorizedException extends RuntimeException
{
    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException() {
        super("Для этого действия требуется вход");
    }
}
