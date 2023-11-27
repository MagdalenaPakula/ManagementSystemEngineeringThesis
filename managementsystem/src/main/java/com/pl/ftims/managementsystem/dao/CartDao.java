package com.pl.ftims.managementsystem.dao;

import com.pl.ftims.managementsystem.POJO.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartDao extends JpaRepository<Cart, Integer> {


    List<Cart> getAllBills();

    List<Cart> getBillByUserName(@Param("username") String username);
}
