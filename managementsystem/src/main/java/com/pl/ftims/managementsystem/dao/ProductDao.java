package com.pl.ftims.managementsystem.dao;

import com.pl.ftims.managementsystem.POJO.Product;
import com.pl.ftims.managementsystem.wrapper.ProductWrapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductDao extends JpaRepository<Product, Integer> {

    List<ProductWrapper> getAllProducts();

}
