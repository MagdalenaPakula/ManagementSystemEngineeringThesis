import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit{
  categories: any[] = [];
  newCategoryName: string = '';

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error loading categories', error);
      }
    );
  }

  updateCategory(category: any) {
    // Implement logic to update the category name
    category.name = prompt('Enter the new category name:', category.name);
    if (category.name) {
      this.categoryService.updateCategory(category).subscribe(
        (data: any) => {
          console.log('Category updated successfully', data);
          this.loadCategories();
        },
        (error: any) => {
          console.error('Error updating category', error);
        }
      );
    }
  }

  addCategory() {
    if (this.newCategoryName) {
      const newCategory = { name: this.newCategoryName };
      this.categoryService.addCategory(newCategory).subscribe(
        (data: any) => {
          console.log('Category added successfully', data);
          this.newCategoryName = '';
          this.loadCategories();
        },
        (error: any) => {
          console.error('Error adding category', error);
        }
      );
    }
  }

}
