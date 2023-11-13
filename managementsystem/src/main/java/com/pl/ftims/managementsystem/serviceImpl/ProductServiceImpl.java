package com.pl.ftims.managementsystem.serviceImpl;

import com.pl.ftims.managementsystem.JWT.JwtFilter;
import com.pl.ftims.managementsystem.POJO.Category;
import com.pl.ftims.managementsystem.POJO.Product;
import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.dao.ProductDao;
import com.pl.ftims.managementsystem.service.ProductService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import com.pl.ftims.managementsystem.wrapper.ProductWrapper;
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
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDao productDao;

    @Autowired
    JwtFilter jwtFilter;

    @Override
    public ResponseEntity<String> addNewProduct(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if(validateProductMap(requestMap, false)){
                    productDao.save(getProductFromMap(requestMap,false));
                    return BusinessUtils.getResponseEntity("Product Added Successfully", HttpStatus.OK);
                }
                return BusinessUtils.getResponseEntity(BusinessConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else{
                return BusinessUtils.getResponseEntity(BusinessConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ProductWrapper>> getAllProducts() {
        try{
            return new ResponseEntity<>(productDao.getAllProducts(), HttpStatus.OK);
        }catch(Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> updateProduct(Map<String, String> requestMap) {
        try{
            if(jwtFilter.isAdmin()){
                if(validateProductMap(requestMap, true)){
                    Optional <Product> optional = productDao.findById(Integer.parseInt(requestMap.get("id")));
                    if(!optional.isEmpty()){
                        Product product = getProductFromMap(requestMap, true);
                        product.setStatus(optional.get().getStatus());
                        productDao.save(product);
                        return BusinessUtils.getResponseEntity("Product updated successfully", HttpStatus.OK);
                    }else{
                        return BusinessUtils.getResponseEntity("Product ID does not exist", HttpStatus.OK);
                    }
                }
                return BusinessUtils.getResponseEntity(BusinessConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else{
                return BusinessUtils.getResponseEntity(BusinessConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        }catch(Exception exception){
            exception.printStackTrace();
        }
        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public boolean validateProductMap(Map<String, String> requestMap, boolean validateId){
        if(requestMap.containsKey("name")){
            if(requestMap.containsKey("id") && validateId){
                return true;
            }else if (!validateId) {
                return true;
            }
        }
        return false;
    }

    private Product getProductFromMap(Map<String, String> requestMap, Boolean isAdded){
        Category category = new Category();
        category.setId(Integer.parseInt(requestMap.get("categoryId")));

        Product product = new Product();
        if(isAdded){
            product.setId(Integer.parseInt(requestMap.get("id")));
        } else{
            product.setStatus("true");
        }
        product.setCategory((category));
        product.setName(requestMap.get("name"));
        product.setDescription(requestMap.get("description"));
        product.setPrice(Float.parseFloat(requestMap.get("price")));
        return product;
    }

}
