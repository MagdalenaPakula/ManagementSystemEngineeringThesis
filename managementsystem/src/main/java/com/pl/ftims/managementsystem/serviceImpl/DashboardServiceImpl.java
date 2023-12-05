package com.pl.ftims.managementsystem.serviceImpl;

import com.pl.ftims.managementsystem.dao.CartDao;
import com.pl.ftims.managementsystem.dao.CategoryDao;
import com.pl.ftims.managementsystem.dao.ProductDao;
import com.pl.ftims.managementsystem.dao.UserDao;
import com.pl.ftims.managementsystem.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    CategoryDao categoryDao;

    @Autowired
    ProductDao productDao;

    @Autowired
    CartDao cartDao;

    @Autowired
    UserDao userDao;

    @Override
    public ResponseEntity<Map<String, Object>> getCount() {
        Map<String, Object> map = new HashMap<>();
        map.put("category", categoryDao.count());
        map.put("product", productDao.count());
        map.put("cart", cartDao.count());
        map.put("user", userDao.count());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
