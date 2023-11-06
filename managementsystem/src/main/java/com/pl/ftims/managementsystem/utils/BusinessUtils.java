package com.pl.ftims.managementsystem.utils;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BusinessUtils {

    private BusinessUtils(){

    }

    public static ResponseEntity<String> getResponseEntity(String responseMessage, HttpStatus httpStatus){
        return new ResponseEntity<String>("{\"message\" : \""+responseMessage+"\"}", httpStatus);
    }
}
