package com.dron.edusynthserver.Exceptions;

public class BadAnswerFormat extends RuntimeException {
    public BadAnswerFormat(String message) {
        super(message);
    }

    public BadAnswerFormat() {
        super("Нерпавильный формат запроса");
    }
}
