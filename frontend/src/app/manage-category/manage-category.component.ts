import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {AddUpdateCategoryComponent} from "../add-update-category/add-update-category.component";

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit{
  categories: any[] = [];

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  openAddUpdateDialog(category?: any) {
    const dialogRef = this.dialog.open(AddUpdateCategoryComponent, {
      width: '400px',
      data: category || null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.loadCategories();
      }
    });
  }

}
