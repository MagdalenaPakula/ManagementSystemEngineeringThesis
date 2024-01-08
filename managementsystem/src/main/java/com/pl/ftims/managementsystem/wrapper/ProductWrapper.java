package com.pl.ftims.managementsystem.wrapper;

import lombok.Data;

@Data
public class ProductWrapper {

    private Integer id;

    private String name;

    private String description;

    private Float price;

    private String status;

    private Integer categoryId;

    private String categoryName;

    private byte[] image; // Added image field

    public ProductWrapper(Integer id, String name, String description, Float price, String status, Integer categoryId, String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.status = status;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public ProductWrapper(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public ProductWrapper(Integer id, String name, String description, Float price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
