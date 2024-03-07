package com.dron.edusynthserver.exceptions;

public class BadAnswerFormat extends RuntimeException {
    public BadAnswerFormat(String message) {
        super(message);
    }

    public BadAnswerFormat() {
        super("Нерпавильный формат запроса");
    }
}
