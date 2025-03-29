package com.dron.edusynthserver.Exceptions;

public class IncorrectSessionState extends RuntimeException  {
    public IncorrectSessionState(String message) {
        super(message);
    }

    public IncorrectSessionState() {
        super("Неверное состояние сессии");
    }
}
