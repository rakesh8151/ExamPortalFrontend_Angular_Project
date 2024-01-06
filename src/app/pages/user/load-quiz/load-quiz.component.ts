import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,
  ],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent {
  catId = -1;
  quizzes = [];
  quiz = {};
  constructor(private route: ActivatedRoute,
    private quizService: QuizService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    //this.catId = this.route.snapshot.params['catId'];
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        //load all quiz
        this.quizService.Quizzes().subscribe(
          (data: any) => {
            this.quizzes = data
          },
          (error) => {
            this.snack.open('Error in loading quiz from server', '', {
              duration: 3000
            });
          }
        );
      } else if (this.catId != -1) {
       // load specific quiz
        this.quizService.getQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data
          },
          (error) => {
            this.snack.open('Error in loading quiz from server', '', {
              duration: 3000
            });
          }
        );
      }
    })

  }
}
