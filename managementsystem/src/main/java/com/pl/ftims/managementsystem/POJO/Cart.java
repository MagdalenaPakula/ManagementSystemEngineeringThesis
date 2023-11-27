//Shopping Basket - Shopping Cart - Summary of the bill
package com.pl.ftims.managementsystem.POJO;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@NamedQuery(name = "Cart.getAllBills", query = "select c from Cart c order by c.id desc")

@NamedQuery(name = "Cart.getBillByUserName", query = "select c from Cart c where c.createdBy=:username order by c.id desc")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "cart")
public class Cart {

    private static final long SerialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "paymentMethod")
    private String paymentMethod;

    @Column(name = "productDetails", columnDefinition = "json")
    private String productDetails;

    @Column(name = "totalAmount")
    private Float totalAmount;

    @Column(name = "createdBy")
    private String createdBy;


}
