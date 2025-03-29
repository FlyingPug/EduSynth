package com.dron.edusynthserver.Exceptions;

public class BadNameException extends RuntimeException
{
    public BadNameException(String message) {
        super(message);
    }

    public BadNameException() {
        super("Нерпавильный формат имени");
    }
}
