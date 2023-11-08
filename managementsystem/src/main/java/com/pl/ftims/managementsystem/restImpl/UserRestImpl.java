package com.pl.ftims.managementsystem.restImpl;

import com.pl.ftims.managementsystem.POJO.User;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.rest.UserRest;
import com.pl.ftims.managementsystem.service.UserService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import com.pl.ftims.managementsystem.wrapper.UserWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try{
            return userService.signUp(requestMap);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try{
            return userService.login(requestMap);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUsers() {
        try{
            return userService.getAllUsers();
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<List<UserWrapper>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try{
            return userService.update(requestMap);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> checkToken() {
        try{
            return userService.checkToken();
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try{
            return userService.changePassword(requestMap);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
        try{
            return userService.forgotPassword(requestMap);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
