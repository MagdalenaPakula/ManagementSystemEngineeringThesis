package com.pl.ftims.managementsystem.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserWrapper {

    private Integer id;

    private String name;

    private String surname;

    private String email;

    private String status;


    public UserWrapper(Integer id, String name, String surname, String email, String status) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.status = status;
    }
}
