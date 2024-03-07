package com.dron.edusynthserver.exceptions;

public class BadNameException extends RuntimeException
{
    public BadNameException(String message) {
        super(message);
    }

    public BadNameException() {
        super("Нерпавильный формат имени");
    }
}
