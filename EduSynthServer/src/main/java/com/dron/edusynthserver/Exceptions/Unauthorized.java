package com.dron.edusynthserver.Exceptions;

public class Unauthorized extends RuntimeException
{
    public Unauthorized(String message) {
        super(message);
    }

    public Unauthorized() {
        super("Для этого действия требуется вход");
    }
}
