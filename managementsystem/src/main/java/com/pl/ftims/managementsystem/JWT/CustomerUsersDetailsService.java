package com.pl.ftims.managementsystem.JWT;

import com.pl.ftims.managementsystem.POJO.User;
import com.pl.ftims.managementsystem.dao.UserDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;
@Slf4j
@Service
public class CustomerUsersDetailsService implements UserDetailsService {

    @Autowired
    UserDao userDao;

    private com.pl.ftims.managementsystem.POJO.User userDetails;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Inside loadUserByUsername", username);
        userDetails = userDao.findByEmailId(username);
        if(!Objects.isNull(userDetails))
            return new org.springframework.security.core.userdetails.User(userDetails.getEmail(), userDetails.getPassword(), new ArrayList<>());
        else
            throw new UsernameNotFoundException("User not found");
    }

    private com.pl.ftims.managementsystem.POJO.User getUserDetails(){
        return userDetails;
    }

}
