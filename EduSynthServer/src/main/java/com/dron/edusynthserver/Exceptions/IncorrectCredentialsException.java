package com.dron.edusynthserver.Exceptions;

public class IncorrectCredentialsException extends RuntimeException
{
    public IncorrectCredentialsException(String message) {
        super(message);
    }

    public IncorrectCredentialsException() {
        super("Неправильный логин или пароль");
    }
}
