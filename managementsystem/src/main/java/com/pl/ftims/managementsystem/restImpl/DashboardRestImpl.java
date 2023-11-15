package com.pl.ftims.managementsystem.restImpl;

import com.pl.ftims.managementsystem.constants.BusinessConstants;
import com.pl.ftims.managementsystem.rest.DashboardRest;
import com.pl.ftims.managementsystem.service.DashboardService;
import com.pl.ftims.managementsystem.utils.BusinessUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DashboardRestImpl implements DashboardRest {

    @Autowired
    DashboardService dashboardService;

    @Override
    public ResponseEntity<Map<String, Object>> getCount() {
        try{
            return dashboardService.getCount();

        }catch(Exception exception){
            exception.printStackTrace();
        }
        return null;
//        return BusinessUtils.getResponseEntity(BusinessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
