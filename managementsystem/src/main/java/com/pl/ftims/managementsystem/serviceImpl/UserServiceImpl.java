package com.pl.ftims.managementsystem.serviceImpl;

import com.pl.ftims.managementsystem.POJO.User;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.dao.UserDao;
import com.pl.ftims.managementsystem.service.UserService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import com.pl.ftims.managementsystem.wrapper.UserWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.Authenticator;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup", requestMap);
        try {
            if (validateSingUpMap(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    userDao.save(getUserFromMap(requestMap));
                    return BusinessUtils.getResponseEntity("Successfully registered.", HttpStatus.OK);
                } else {
                    return BusinessUtils.getResponseEntity("Email already exists", HttpStatus.BAD_REQUEST);
                }

            } else {
                return BusinessUtils.getResponseEntity(BusinessConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex) {
            ex.printStackTrace();
        }return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
    }

    private boolean validateSingUpMap(Map<String, String> requestMap){
        if (requestMap.containsKey("name") && requestMap.containsKey("surname")
                && requestMap.containsKey("email") && requestMap.containsKey("password")) {
            return true;
        } else return false;
    }

    private User getUserFromMap(Map<String, String> requestMap){
        User user = new User();
        user.setEmail(requestMap.get("email"));
        user.setName(requestMap.get("name"));
        user.setSurname(requestMap.get("surname"));
        user.setPassword(requestMap.get("password"));
        user.setRole(requestMap.get("user"));
        return user;
    }

    // login to change by security: 3rd part, 8:12
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login");
        try {
//            Authentication authentication = authenticationManager.authenticate();

        } catch (Exception ex) {
            ex.printStackTrace();
            return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUsers() {
        try{
//            if(jwtFilter.isAdmin()){
//
//            }else{
//                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
//            }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        }catch(Exception exception){
            exception.printStackTrace();
        }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
