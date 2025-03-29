package com.dron.edusynthserver.Exceptions;

public class Forbidden extends RuntimeException {
    public Forbidden(String message) {
        super(message);
    }

    public Forbidden() {
        super("У вас нет доступа для этого");
    }
}
