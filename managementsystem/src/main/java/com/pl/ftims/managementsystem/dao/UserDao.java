package com.pl.ftims.managementsystem.dao;

import com.pl.ftims.managementsystem.POJO.User;

import com.pl.ftims.managementsystem.wrapper.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserDao extends JpaRepository<User, Integer> {

    User findByEmailId(@Param("email") String email);

    List<UserWrapper> getAllUsers();
}
