import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-quiz',
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
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {
  quizId = -1;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: ''
    },
  };
  categories=[];
  constructor(
    private route: ActivatedRoute, 
    private quizService: QuizService,
     private categoryService: CategoryService,
     private snack:MatSnackBar,
     private router:Router) { }
  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['qid'];
    this.quizService.getQuiz(this.quizId).subscribe(
      (data: any) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Server error on loading data', 'error');
      }
    );
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(data);
      },
      (error) => {
        Swal.fire('Error !!', 'Server error on loading data', 'error');
      }

    );
  }
  updateQuiz(){
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this.snack.open('title is required','',{
       duration:3000
      });
      return;
   }
   if(this.quiz.category.cid=='' || this.quiz.category.cid==null){
     this.snack.open('category selection  is required','',{
      duration:3000
     });
     return;
  }
    this.quizService.updateQuiz(this.quiz,this.quizId).subscribe(
      (data:any)=>{
        Swal.fire('Success !!','quiz is updated successfully !!','success').then((res)=>{
          this.router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error !!','Error in updating quiz on the server !!','error');
    
      }
    );
  }
}
