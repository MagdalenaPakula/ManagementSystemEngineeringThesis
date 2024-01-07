import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../services/category.service";
import {SnackbarService} from "../services/snackbar.service";
import {CartService} from "../services/cart.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstants} from "../global-constants";
import {ProductService} from "../services/product.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
export class ManageOrderComponent implements OnInit{

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm: any = FormGroup;
  categories: any = [];
  products: any = [];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;

  constructor(private formBuilder:FormBuilder,
              private categoryService:CategoryService,
              private productService:ProductService,
              private snackbarService:SnackbarService,
              private cartService:CartService,
              private ngxService:NgxUiLoaderService) {
  }
  ngOnInit() {
    this.ngxService.start();
    this.getCategories();
    this.manageOrderForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: ['', [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      paymentMethod: ['', [Validators.required]],
      product: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      total: ['', [Validators.required]],
    })
  }

  getCategories(){
    this.categoryService.getAllCategories();
  }

  getProductsByCategory(value: any){
    this.productService.getProductByCategory(value.id).subscribe((response: any) => {
      this.products = response;
      // Assuming the response contains price information
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue(1);
      this.manageOrderForm.controls['total'].setValue(0);
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.errorek);
      }
    });
  }

  getProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe((response: any) => {
      this.price = response.price;
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue(1);
      this.manageOrderForm.controls['total'].setValue(this.price * 1);
    }, (error: any) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.errorek);
      }
    });
  }

  setQuantity(value: any) {
    var temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value*this.manageOrderForm.controls['price'].value);
    } else if (temp != 0){
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }

  validateProductAdd() {
    if (this.manageOrderForm.controls['total'].value === 0 || this.manageOrderForm.controls['total'].value === null || this.manageOrderForm.controls['quantity'].value <= 0) {
      return true;
    } else {
      return false;
    }
  }

  validateSubmit() {
    if (this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null || this.manageOrderForm.controls['email'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null) {
      return true;
    } else {
      return false;
    }
  }

  add(){
    var formData = this.manageOrderForm.value;
    var productName = this.dataSource.find((e: {id:number}) => e.id === formData.product.id);
    if(productName === undefined){
      this.totalAmount = this.totalAmount + formData;
      this.dataSource.push({id:formData.product.id, name:formData.product.name, category:formData.category.name, quantity:formData.quantity, price:formData.price, total:formData.total});
      this.dataSource = [...this.dataSource];
      this.snackbarService.openSnackBar("Success", "Success");
    }
    else{
      this.snackbarService.openSnackBar("There is an error", GlobalConstants.errorek)
    }
  }

  handleDeleteAction(value: any, element:any) {
    this.totalAmount = this.totalAmount -element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
    var formData = this.manageOrderForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount.toString(),
      productDetails: JSON.stringify(this.dataSource)
    }
    this.ngxService.start();
    this.cartService.generateReport(data).subscribe((response: any)=>{
      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    }, (error: any )=>{
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.errorek);
      }
    })

  }

  downloadFile(filename: string) {
    var data ={
      uuid: filename
    }
    this.cartService.getPdf(data).subscribe(
      (response: any) => {
        saveAs(response, filename + ".pdf");
        this.ngxService.stop();
      },
      (error: any) => {
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.errorek);
        }
      }
    );
  }

}
