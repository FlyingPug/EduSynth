package com.dron.edusynthserver.exceptions;

public class Forbidden extends RuntimeException {
    public Forbidden(String message) {
        super(message);
    }

    public Forbidden() {
        super("У вас нет доступа для этого");
    }
}
