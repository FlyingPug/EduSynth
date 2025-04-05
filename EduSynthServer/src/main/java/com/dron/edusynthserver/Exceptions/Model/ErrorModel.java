package com.dron.edusynthserver.Exceptions.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorModel
{
    private String errorMessage;
    private Integer errorCode;

}
