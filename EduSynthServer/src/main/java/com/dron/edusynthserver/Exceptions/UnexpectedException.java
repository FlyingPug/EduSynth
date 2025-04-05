package com.dron.edusynthserver.Exceptions;

public class UnexpectedException extends RuntimeException {
    public UnexpectedException(String message) {
        super(message);
    }

    public UnexpectedException() {
        super("Unexpeded Exception");
    }
}
