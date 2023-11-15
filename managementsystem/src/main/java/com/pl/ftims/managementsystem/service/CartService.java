package com.pl.ftims.managementsystem.service;

import com.pl.ftims.managementsystem.POJO.Cart;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface CartService {
    ResponseEntity<List<Cart>> getBills();

    ResponseEntity<String> generateReport(Map<String, Object> requestMap);
}
