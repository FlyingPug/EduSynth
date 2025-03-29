package com.dron.edusynthserver.Exceptions;

public class UserAlreadyExistsException extends RuntimeException
{
    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public UserAlreadyExistsException() {
        super("Пользователь с тем же именем уже существует");
    }
}
