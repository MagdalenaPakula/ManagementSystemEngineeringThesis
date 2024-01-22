//package com.pl.ftims.managementsystem.rest;
//
//import com.pl.ftims.managementsystem.restImpl.UserRestImpl;
//import com.pl.ftims.managementsystem.service.UserService;
//import com.pl.ftims.managementsystem.utils.BusinessUtils;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//class UserRestImplTest {
//
//    @Mock
//    private UserService userService;
//
//    @InjectMocks
//    private UserRestImpl userRestImpl;
//
//    @Test
//    void signUp_Success() {
//        // Arrange
//        Map<String, String> requestMap = new HashMap<>();
//        when(userService.signUp(requestMap)).thenReturn(new ResponseEntity<>("User signed up successfully", HttpStatus.CREATED));
//
//        // Act
//        ResponseEntity<String> response = userRestImpl.signUp(requestMap);
//
//        // Assert
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertEquals("User signed up successfully", response.getBody());
//    }
//
//    @Test
//    void signUp_Failure() {
//        // Arrange
//        Map<String, String> requestMap = new HashMap<>();
//        when(userService.signUp(requestMap)).thenThrow(new RuntimeException("Something went wrong"));
//
//        // Act
//        ResponseEntity<String> response = userRestImpl.signUp(requestMap);
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//        assertEquals(BusinessUtils.getResponseEntity("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR), response);
//    }
//}
