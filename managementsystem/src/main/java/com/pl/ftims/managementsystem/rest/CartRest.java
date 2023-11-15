package com.pl.ftims.managementsystem.rest;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.Objects;

@RequestMapping(path = "/cart")
public interface CartRest {

    @PostMapping(path = "/generateReport")
    ResponseEntity<String> generateReport(@RequestBody Map<String, Object> requestMap);
}
