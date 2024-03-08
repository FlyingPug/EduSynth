package com.dron.edusynthserver.exceptions;

public class Unauthorized extends RuntimeException
{
    public Unauthorized(String message) {
        super(message);
    }

    public Unauthorized() {
        super("Для этого действия требуется вход");
    }
}
