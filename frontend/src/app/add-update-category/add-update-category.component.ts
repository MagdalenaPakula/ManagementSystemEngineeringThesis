import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-add-update-category',
  templateUrl: './add-update-category.component.html',
  styleUrl: './add-update-category.component.scss'
})
export class AddUpdateCategoryComponent {

  category: any = {};

  constructor(
      private dialogRef: MatDialogRef<AddUpdateCategoryComponent>,
      private categoryService: CategoryService,
      @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // If data is provided, it means we're updating an existing category
    if (data) {
      this.category = { ...data };
    }
  }

  saveCategory() {
    const saveObservable = this.category.id
        ? this.categoryService.updateCategory(this.category)
        : this.categoryService.addCategory(this.category);

    saveObservable.subscribe(
        () => {
          this.dialogRef.close('success');
        },
        (error) => {
          console.error('Error saving category:', error);
        }
    );
  }

}
