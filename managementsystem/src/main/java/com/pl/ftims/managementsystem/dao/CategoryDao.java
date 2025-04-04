package com.pl.ftims.managementsystem.dao;

import com.pl.ftims.managementsystem.POJO.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryDao extends JpaRepository<Category, Integer> {

    List<Category> getAllCategory();

}
