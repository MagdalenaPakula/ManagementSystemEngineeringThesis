package com.pl.ftims.managementsystem.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface CartService {
    ResponseEntity<String> generateReport(Map<String, Object> requestMap);
}
