//package com.pl.ftims.managementsystem.service;
//
//import com.pl.ftims.managementsystem.JWT.JwtFilter;
//import com.pl.ftims.managementsystem.POJO.Category;
//import com.pl.ftims.managementsystem.dao.CategoryDao;
//import com.pl.ftims.managementsystem.serviceImpl.CategoryServiceImpl;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//public class CategoryServiceImplTest {
//
//    @InjectMocks
//    private CategoryServiceImpl categoryService;
//
//    @Mock
//    private CategoryDao categoryDao;
//
//    @Mock
//    private JwtFilter jwtFilter;
//
//    @Test
//    void testAddNewCategory() {
//        // Mocking isAdmin() to return true
//        Mockito.when(jwtFilter.isAdmin()).thenReturn(true);
//
//        // Mocking validateCategoryMap() to return true
//        Mockito.when(categoryService.validateCategoryMap(Mockito.anyMap(), Mockito.eq(false))).thenReturn(true);
//
//        // Mocking getCategoryFromMap() to return a Category object
//        Mockito.when(categoryService.getCategoryFromMap(Mockito.anyMap(), Mockito.eq(false))).thenReturn(new Category());
//
//        // Testing the addNewCategory method
//        ResponseEntity<String> response = categoryService.addNewCategory(new HashMap<>());
//
//        // Assertion
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals("Category Added Successfully", response.getBody());
//    }
//
//    @Test
//    void testGetAllCategory() {
//        // Mocking isAdmin() to return true
//        Mockito.when(jwtFilter.isAdmin()).thenReturn(true);
//
//        // Mocking getAllCategory() to return a list of categories
//        Mockito.when(categoryDao.getAllCategory()).thenReturn(Collections.singletonList(new Category()));
//
//        // Testing the getAllCategory method with filterValue set to "true"
//        ResponseEntity<List<Category>> response = categoryService.getAllCategory("true");
//
//        // Assertion
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(1, response.getBody().size());
//    }
//}
