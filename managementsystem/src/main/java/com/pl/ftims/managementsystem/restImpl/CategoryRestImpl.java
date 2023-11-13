package com.pl.ftims.managementsystem.restImpl;

import com.pl.ftims.managementsystem.POJO.Category;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.rest.CategoryRest;
import com.pl.ftims.managementsystem.service.CategoryService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@RestController
public class CategoryRestImpl implements CategoryRest {

    @Autowired
    CategoryService categoryService;

    @Override
    public ResponseEntity<String> addNewCategory(Map<String, String> requestMap) {
        try{
            return categoryService.addNewCategory(requestMap);

        }catch(Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Category>> getAllCategory(String filterValue) {
        try{
            return categoryService.getAllCategory(filterValue);

        }catch(Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategory(Map<String, String> requestMap) {
        try{
            return categoryService.updateCategory(requestMap);

        }catch(Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
