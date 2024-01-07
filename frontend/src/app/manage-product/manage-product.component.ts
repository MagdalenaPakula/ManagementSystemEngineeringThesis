import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../services/dialog.service";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent implements OnInit {
  products: any[] = [];
  productForm: FormGroup;
  categoryId: number | undefined; // Add categoryId variable
  productId: number | undefined;  // Add productId variable

  constructor(private productService: ProductService, private fb: FormBuilder, private dialogService: DialogService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error loading products (loadProducts)', error);
      }
    );
  }
  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(
      (data: any) => {
        // Handle success, maybe show a success message
        console.log('Product deleted successfully');
        this.loadProducts(); // Refresh the product list
      },
      (error: any) => {
        console.error('Error deleting product', error);
      }
    );
  }


  addNewProduct(){
    if (this.productForm.valid) {
      const newProductData = this.productForm.value;

      this.productService.addNewProduct(newProductData).subscribe(
        (data: any) => {
          console.log('Product added successfully');
          this.loadProducts(); // Refresh the product list
          this.productForm.reset(); // Reset the form after adding a product
        },
        (error: any) => {
          console.error('Error adding product', error);
        }
      );
    }
  }

  updateProduct(product: any) {
    // Prompt the user for new values (you can customize this based on your needs)
    product.name = prompt('Enter the new product name:', product.name);
    product.categoryId = prompt('Enter the new category ID:', product.categoryId);
    product.description = prompt('Enter the new description:', product.description);
    product.price = prompt('Enter the new price:', product.price);

    if (product.name  && product.categoryId  &&
      product.description  && product.price ) {
      this.productService.updateProduct(product).subscribe(
        (data: any) => {
          console.log('Product updated successfully', data);
          this.loadProducts(); // Refresh the product list
        },
        (error: any) => {
          console.error('Error updating product', error);
        }
      );
    }
  }

  // Add new methods for filtering products
  filterByCategory() {
    if (this.categoryId !== undefined) {
      this.productService.getProductByCategory(this.categoryId).subscribe(
        (data: any) => {
          this.products = data;
        },
        (error: any) => {
          console.error('Error filtering products by category', error);
        }
      );
    }
  }

  filterById() {
    if (this.productId !== undefined){
      this.productService.getProductById(this.productId).subscribe(
        (data: any) => {
          this.products = data;
        },
        (error: any) => {
          console.error('Error filtering products by ID', error);
        }
      );
    }
  }

  resetFilters() {
    this.loadProducts(); // Reset by fetching all products
  }

}

