import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    JsonPipe
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category = {
    title: '',
    description: '',
  };
  constructor(private categoryService: CategoryService, private snack: MatSnackBar) { }
  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open("title is required !!", "", {
        duration: 3000
      });
      return;
    }

    this.categoryService.addcategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '',
          this.category.description = '',
          Swal.fire("Success !!", 'Category added successfully..', 'success');
      },
      (error) => {
        Swal.fire("Error !!", 'Server error !!', 'error');
      }
    );
  }
}
