package com.dron.edusynthserver.Exceptions;

public class IncorrectCredentials extends RuntimeException
{
    public IncorrectCredentials(String message) {
        super(message);
    }

    public IncorrectCredentials() {
        super("Неправильный логин или пароль");
    }
}
