package com.pl.ftims.managementsystem.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


import javax.persistence.*;
import java.io.Serializable;

@NamedQuery(name = "Category.getAllCategory", query = "select c from Category c")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "category")
public class Category implements Serializable {

    private static final long SerialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

//    This is for subcategories - products in each category
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Integer id;
//
//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "mass")
//    private Integer mass;
//
//    @Column(name = "amount")
//    private Integer amount;
//
//    @Column(name = "available")
//    private String available;
//
//    @Column(name = "onSale")
//    private String onSale;

}
