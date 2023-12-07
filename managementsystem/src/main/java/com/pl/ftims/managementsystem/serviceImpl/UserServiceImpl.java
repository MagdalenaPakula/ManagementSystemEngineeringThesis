package com.pl.ftims.managementsystem.serviceImpl;

import com.google.common.base.Strings;
import com.pl.ftims.managementsystem.JWT.CustomerUsersDetailsService;
import com.pl.ftims.managementsystem.JWT.JwtFilter;
import com.pl.ftims.managementsystem.JWT.JwtUtils;
import com.pl.ftims.managementsystem.POJO.User;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.dao.UserDao;
import com.pl.ftims.managementsystem.service.UserService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import com.pl.ftims.managementsystem.utils.EmailUtils;
import com.pl.ftims.managementsystem.wrapper.UserWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerUsersDetailsService customerUsersDetailsService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    JwtFilter jwtFilter;

    @Autowired
    EmailUtils emailUtils;

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
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
    }

    private boolean validateSingUpMap(Map<String, String> requestMap) {
        return requestMap.containsKey("name") && requestMap.containsKey("surname")
                && requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    private User getUserFromMap(Map<String, String> requestMap) {
        User user = new User();
        user.setEmail(requestMap.get("email"));
        user.setName(requestMap.get("name"));
        user.setSurname(requestMap.get("surname"));
        user.setPassword(requestMap.get("password"));
        user.setRole("user");
        user.setStatus("false");
        return user;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password"))
            );
            if (authentication.isAuthenticated()) {
                if (customerUsersDetailsService.getUserDetails().getStatus().equalsIgnoreCase("true")) {
                    return new ResponseEntity<String>("{\"token\":\"" +
                            jwtUtils.generateToken(customerUsersDetailsService.getUserDetails().getEmail(),
                                    customerUsersDetailsService.getUserDetails().getRole()) + "\"}", HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<String>("{\"message\":\"" + "Wait for Admin approval." + "\"}", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("{\"message\":\"" + "Bad credentials." + "\"}", HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUsers() {
        try {
            if (jwtFilter.isAdmin()) {
                return new ResponseEntity<>(userDao.getAllUsers(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update( Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()) {
                Optional<User> optional = userDao.findById(Integer.parseInt(requestMap.get("id")));
                if (optional.isPresent()) {
                    User user = optional.get();

                    // Update name if provided
                    if (requestMap.containsKey("name") && !requestMap.get("name").isEmpty()) {
                        user.setName(requestMap.get("name"));
                    }

                    // Update surname if provided
                    if (requestMap.containsKey("surname") && !requestMap.get("surname").isEmpty()) {
                        user.setSurname(requestMap.get("surname"));
                    }

                    // Update email if provided
                    if (requestMap.containsKey("email") && !requestMap.get("email").isEmpty()) {
                        user.setEmail(requestMap.get("email"));
                    }

                    // Update password if provided
                    if (requestMap.containsKey("password") && !requestMap.get("password").isEmpty()) {
                        user.setPassword(requestMap.get("password"));
                    }

                    // Update status if provided
                    if (requestMap.containsKey("status") && !requestMap.get("status").isEmpty()) {
                        user.setStatus(requestMap.get("status"));
                    }

                    // Update role if provided
                    if (requestMap.containsKey("role") && !requestMap.get("role").isEmpty()) {
                        user.setRole(requestMap.get("role"));
                    }

                    userDao.save(user);

                    return BusinessUtils.getResponseEntity("User updated successfully", HttpStatus.OK);
                } else {
                    return BusinessUtils.getResponseEntity("User not found in the database", HttpStatus.NOT_FOUND);
                }
            } else {
                return BusinessUtils.getResponseEntity(BusinessConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private void sendMailToAllAdmin(String status, String user, List<String> allAdmin) {
        allAdmin.remove(jwtFilter.getCurrentUser());
        if (status != null && status.equalsIgnoreCase("true")) {
            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser(), "Account Approved", "USER:-" + user + "\n is approved by \nADMIN:-" + jwtFilter.getCurrentUser(), allAdmin);
        } else {
            emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser(), "Account Disabled", "USER:-" + user + "\n is disabled by \nADMIN:-" + jwtFilter.getCurrentUser(), allAdmin);
        }
    }

    @Override
    public ResponseEntity<String> checkToken() {
        return BusinessUtils.getResponseEntity("True", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try {
            User userObj = userDao.findByEmail(jwtFilter.getCurrentUser());
            if (!userObj.equals(null)) {
                if (userObj.getPassword().equals(requestMap.get("oldPassword"))) {
                    userObj.setPassword(requestMap.get("newPassword"));
                    userDao.save(userObj);
                    return BusinessUtils.getResponseEntity("Password updated successfully", HttpStatus.OK);
                }
                return BusinessUtils.getResponseEntity("Incorrect Old Password", HttpStatus.BAD_REQUEST);
            }
            return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
        try {
            User user = userDao.findByEmail(requestMap.get("email"));
            if (!Objects.isNull(user) && !Strings.isNullOrEmpty(user.getEmail())) emailUtils.forgotMail(user.getEmail(), "Credentials by Business", user.getPassword());
            return BusinessUtils.getResponseEntity("Check your email for Credentials", HttpStatus.OK);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
