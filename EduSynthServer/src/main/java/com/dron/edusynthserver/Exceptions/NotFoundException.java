package com.dron.edusynthserver.Exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException() {
        super("Не найдено");
    }
}
