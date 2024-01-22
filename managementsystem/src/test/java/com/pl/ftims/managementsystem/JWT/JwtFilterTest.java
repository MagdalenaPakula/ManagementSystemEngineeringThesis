//import com.pl.ftims.managementsystem.JWT.CustomerUsersDetailsService;
//import com.pl.ftims.managementsystem.JWT.JwtFilter;
//import com.pl.ftims.managementsystem.JWT.JwtUtils;
//import org.junit.jupiter.api.Test;
//import org.springframework.mock.web.MockHttpServletRequest;
//import org.springframework.mock.web.MockHttpServletResponse;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import java.io.IOException;
//import java.util.Collections;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//class JwtFilterTest {
//
//    @Test
//    void doFilterInternal() throws ServletException, IOException {
//        // Arrange
//        JwtUtils jwtUtils = new JwtUtils();
//        UserDetailsService userDetailsService = createUserDetailsService();
//        JwtFilter jwtFilter = new JwtFilter(jwtUtils, userDetailsService);
//        MockHttpServletRequest request = new MockHttpServletRequest();
//        MockHttpServletResponse response = new MockHttpServletResponse();
//        FilterChain filterChain = (httpServletRequest, httpServletResponse) -> {};
//
//        // Create a valid token for testing
//        String token = jwtUtils.generateToken("testUser");
//
//        // Set the Authorization header with a valid token
//        request.addHeader("Authorization", "Bearer " + token);
//
//        // Act
//        jwtFilter.doFilterInternal(request, response, filterChain);
//
//        // Assert
//        assertTrue(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
//        assertEquals("testUser", jwtFilter.getCurrentUser());
//    }
//
//    @Test
//    void doFilterInternal_InvalidToken() throws ServletException, IOException {
//        // Arrange
//        JwtUtils jwtUtils = new JwtUtils();
//        UserDetailsService userDetailsService = createUserDetailsService();
//        JwtFilter jwtFilter = new JwtFilter(jwtUtils, userDetailsService);
//        MockHttpServletRequest request = new MockHttpServletRequest();
//        MockHttpServletResponse response = new MockHttpServletResponse();
//        FilterChain filterChain = (httpServletRequest, httpServletResponse) -> {};
//
//        // Set an invalid token in the Authorization header
//        request.addHeader("Authorization", "Bearer invalidToken");
//
//        // Act
//        jwtFilter.doFilterInternal(request, response, filterChain);
//
//        // Assert
//        assertFalse(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
//        assertNull(jwtFilter.getCurrentUser());
//    }
//
//    private UserDetailsService createUserDetailsService() {
//        UserDetails userDetails = new User("testUser", "password", Collections.emptyList());
//        return new CustomerUsersDetailsService(userDetails);
//    }
//}
