package com.pl.ftims.managementsystem.restImpl;

import com.pl.ftims.managementsystem.POJO.Cart;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.rest.CartRest;
import com.pl.ftims.managementsystem.service.CartService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class CartRestImpl implements CartRest {

    @Autowired
    CartService cartService;

    @Override
    public ResponseEntity<String> generateReport(Map<String, Object> requestMap) {
        try{
            return cartService.generateReport(requestMap);

        }catch(Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Cart>> getBills() {
        try{
            return cartService.getBills();

        }catch(Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<List<Cart>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
