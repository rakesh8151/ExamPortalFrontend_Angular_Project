import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
categories=[];
constructor(private categoryService:CategoryService,
  private snack:MatSnackBar){}

ngOnInit():void{
  this.categoryService.categories().subscribe(
    (data:any)=>{
      this.categories=data;
    },
    (error)=>{
      this.snack.open('Error in loading categories from server','',{
        duration:3000
      });
    }
  );
}
}
