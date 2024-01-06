import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    JsonPipe
  ],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {
  categories = [];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    },
  };
  constructor(private categoryService: CategoryService,private quizService:QuizService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Server error on loading categories', 'error');
      }
    );
  }
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
       this.snack.open('title is required','',{
        duration:3000
       });
       return;
    }
    if(this.quizData.category.cid=='' || this.quizData.category.cid==null){
      this.snack.open('category selection  is required','',{
       duration:3000
      });
      return;
   }
    this.quizService.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','quiz is added successfully !!','success');
      },
      (error)=>{
        Swal.fire('Error !!','Error in adding quiz on the server !!','error');
    
      }
    );
  }
}
