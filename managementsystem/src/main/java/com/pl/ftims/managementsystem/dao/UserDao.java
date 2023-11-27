package com.pl.ftims.managementsystem.dao;

import com.pl.ftims.managementsystem.POJO.User;
import com.pl.ftims.managementsystem.wrapper.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;


public interface UserDao extends JpaRepository<User, Integer> {

    User findByEmailId(@Param("email") String email);

    User findByEmail(String email);

    List<UserWrapper> getAllUsers();

    List<String> getAllAdmin();

    @Transactional
    @Modifying
    Integer updateStatus(@Param("status") String status, @Param("id") Integer id);
}
