package com.pl.ftims.managementsystem.serviceImpl;

import com.google.common.base.Strings;
import com.pl.ftims.managementsystem.JWT.JwtFilter;
import com.pl.ftims.managementsystem.POJO.Category;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.dao.CategoryDao;
import com.pl.ftims.managementsystem.service.CategoryService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryDao categoryDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewCategory(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateCategoryMap(requestMap, false)) {
                    categoryDao.save(getCategoryFromMap(requestMap, false));
                    return BusinessUtils.getResponseEntity("Category Added Successfully", HttpStatus.OK);
                }
            } else {
                return BusinessUtils.getResponseEntity(BusinessConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Category>> getAllCategory(String filterValue) {
        try {
            if (!Strings.isNullOrEmpty(filterValue) && filterValue.equalsIgnoreCase("true")) {
                log.info("Inside if");
                return new ResponseEntity<List<Category>>(categoryDao.getAllCategory(), HttpStatus.OK);
            }
            return new ResponseEntity<>(categoryDao.findAll(), HttpStatus.OK);

        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategory(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateCategoryMap(requestMap, true)) {
                    Optional optional = categoryDao.findById(Integer.parseInt(requestMap.get("id")));
                    if (!optional.isEmpty()) {
                        categoryDao.save(getCategoryFromMap(requestMap, true));
                        return BusinessUtils.getResponseEntity("Category updated successfully", HttpStatus.OK);
                    } else {
                        return BusinessUtils.getResponseEntity("Category ID does not exist", HttpStatus.OK);
                    }
                }
                return BusinessUtils.getResponseEntity(BusinessConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            } else {
                return BusinessUtils.getResponseEntity(BusinessConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCategory(Integer id) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional optional = categoryDao.findById(id);
                if (!optional.isEmpty()) {
                    categoryDao.deleteById(id);
                    return BusinessUtils.getResponseEntity("Category deleted successfully", HttpStatus.OK);
                }
                return BusinessUtils.getResponseEntity(BusinessConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            } else {
                return BusinessUtils.getResponseEntity(BusinessConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    public boolean validateCategoryMap(Map<String, String> requestMap, boolean validateId) {
        if (requestMap.containsKey("name")) {
            if (requestMap.containsKey("id") && validateId) {
                return true;
            } else return !validateId;
        }
        return false;
    }

    public Category getCategoryFromMap(Map<String, String> requestMap, Boolean isAdded) {
        Category category = new Category();
        if (isAdded) {
            category.setId(Integer.parseInt(requestMap.get("id")));
        }
        category.setName(requestMap.get("name"));
        return category;
    }
}
