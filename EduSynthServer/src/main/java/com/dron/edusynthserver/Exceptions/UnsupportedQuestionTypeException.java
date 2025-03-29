package com.dron.edusynthserver.Exceptions;

public class UnsupportedQuestionTypeException extends RuntimeException {
    public UnsupportedQuestionTypeException(String message) {
        super(message);
    }

    public UnsupportedQuestionTypeException() {
        super("Такого типа вопроса не существует");
    }
}
