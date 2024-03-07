package com.dron.edusynthserver.exceptions.handler;

import com.dron.edusynthserver.exceptions.*;
import com.dron.edusynthserver.exceptions.model.ErrorModel;
import com.dron.edusynthserver.session.model.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class BaseExceptionHandler {

    @ExceptionHandler(BadNameException.class)
    public ResponseEntity<ErrorModel> handleDataIsWrongException(BadNameException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IncorrectCredentials.class)
    public ResponseEntity<ErrorModel> WrongCredentials(BadNameException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.UNAUTHORIZED.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadAnswerFormat.class)
    public ResponseEntity<ErrorModel> BadAnswer(BadNameException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadNameException.class)
    public ResponseEntity<ErrorModel> BadName(BadNameException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorModel> NotFound(NotFoundException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SessionNotFound.class)
    public ResponseEntity<ErrorModel> SessionNotFound(SessionNotFound ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorModel> UserAlreadyExists(UserAlreadyExistsException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.NOT_FOUND);
    }
}
