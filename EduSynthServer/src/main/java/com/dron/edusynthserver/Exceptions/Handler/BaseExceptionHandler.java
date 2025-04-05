package com.dron.edusynthserver.Exceptions.Handler;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.dron.edusynthserver.Exceptions.*;
import com.dron.edusynthserver.Exceptions.Model.ErrorModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class BaseExceptionHandler {

    @ExceptionHandler(BadNameException.class)
    public ResponseEntity<ErrorModel> handleDataIsWrongException(BadNameException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.NOT_FOUND.value()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IncorrectCredentials.class)
    public ResponseEntity<ErrorModel> WrongCredentials(IncorrectCredentials ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.UNAUTHORIZED.value()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JWTDecodeException.class)
    public ResponseEntity<ErrorModel> IncorrectJWT(JWTDecodeException ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.UNAUTHORIZED.value()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadAnswerFormat.class)
    public ResponseEntity<ErrorModel> BadAnswer(BadAnswerFormat ex) {
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
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
        return new ResponseEntity<>(new ErrorModel(ex.getLocalizedMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
    }
}
