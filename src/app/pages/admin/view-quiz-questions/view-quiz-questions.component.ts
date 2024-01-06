import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent {
  quizId = -1;
  title = '';
  questions = [];
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['id'];
    this.title = this.route.snapshot.params['title'];
    this.questionService.getQuestionsOfQuiz(this.quizId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(this.questions);
      },
      (error) => {
        Swal.fire('Error', 'Error in loading questions', 'error');
      }
    );
  }
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure , want to delete this question ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(qid).subscribe(
          (data: any) => {
            Swal.fire('Success !!', 'question is deleted successfully.', 'success');
            this.questions=this.questions.filter((question)=>question['quesId']!=qid);
          }
          , (error) => {
            Swal.fire('Error', 'Error in deleting question', 'error');
          }
        );
      }
    }))
  }
}
