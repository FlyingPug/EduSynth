package com.dron.edusynthserver.exceptions.handler;

import com.dron.edusynthserver.exceptions.BadNameException;
import com.dron.edusynthserver.exceptions.model.ErrorModel;
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
}
