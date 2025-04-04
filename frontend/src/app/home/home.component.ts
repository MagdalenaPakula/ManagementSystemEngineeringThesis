import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ChatService} from "../services/chat.service";
import {ProductService} from "../services/product.service";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchInput: string = '';
  chatInput: string = '';
  chatHistory: { user: string, bot: string }[] = [];


  products: any[] = [];
  categories: any[] = [];

  showCategoriesDropdown: boolean = false; // Add this line

  selectedCategory: any; // Property to store the selected category
  filteredProducts: any[] = []; // Updated to include the selected category


  constructor(
      private chatService: ChatService,
      private productService: ProductService,
      private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
        (data: any) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products', error);
        }
    );

    // Fetch categories from the service
    this.categoryService.getAllCategories().subscribe(
        (data: any) => {
          this.categories = data;
        },
        (error) => {
          console.error('Error fetching categories', error);
        }
    );

  }


  // CHATBOT
  sendMessage() {
    this.chatService.sendMessage(this.chatInput).subscribe((response) => {
      this.chatHistory.push({ user: this.chatInput, bot: response.answer });
      this.chatInput = ''; // Clear the input field
    });
  }

  chatboxActive: boolean = false;


  // BASKET
  handleBasketButtonClick() {
    // TODO: Finish the logic here for adding to the basket
  }

  // SEARCH BAR (Method to filter products based on user input)
  // Updated method to filter products based on user input and selected category
  filterProducts() {
    if (!this.selectedCategory && this.searchInput.trim() === '') {
      // If no category is selected and the input is empty, show all products
      this.filteredProducts = [...this.products];
    } else if (this.selectedCategory) {
      // Filter products based on the selected category
      this.filteredProducts = this.products.filter(product =>
          product.categoryId === this.selectedCategory.id
      );
    } else {
      // Filter products based on user input
      this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }
  }

  // CATEGORY SELECTION
  toggleCategoriesDropdown() {
    this.showCategoriesDropdown = !this.showCategoriesDropdown;
  }

  // Method to handle category selection
  selectCategory(category: any) {
    this.selectedCategory = category; // Set the selected category
    this.filterProducts(); // Filter products based on the selected category
  }
  clearCategoryFilter() {
    this.selectedCategory = null; // Set it to null or an initial value

    // Refresh or re-fetch products without the category filter
    this.productService.getAllProducts().subscribe(
        (data: any) => {
          this.products = data;
          this.filteredProducts = [...this.products]; // Update filteredProducts if needed
        },
        (error) => {
          console.error('Error fetching products', error);
        }
    );
  }
  addToBasket(product: any): void {
    // Implement your logic to add the product to the basket
    console.log(`Added ${product.name} to the basket.`);
  }

}
