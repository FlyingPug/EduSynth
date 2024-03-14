package com.dron.edusynthserver.exceptions;

public class IncorrectSessionState extends RuntimeException  {
    public IncorrectSessionState(String message) {
        super(message);
    }

    public IncorrectSessionState() {
        super("Неверное состояние сессии");
    }
}
