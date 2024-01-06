import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent {
  quizzes = [];
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.Quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  deleteQuiz(quizId: any) {

    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(quizId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz['qid'] != quizId)
            Swal.fire('Success !!', 'quiz is deleted successfully..', 'success');

          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error in deleting quiz on the server', 'error');
          }
        );
      }
    });

  }

}
