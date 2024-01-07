import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import Swal from 'sweetalert2';
import { icons } from '@ckeditor/ckeditor5-core';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterLink
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent {
  quizId = -1;
  quiz = {
    title: '',
    description: '',
    numberOfQuestions: '',
    maxMarks: '',
  };
  constructor(private route: ActivatedRoute,
    private quizService: QuizService,
    private snack: MatSnackBar,
    private router: Router) { }
  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['qid'];
    this.quizService.getQuiz(this.quizId).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        this.snack.open('Error in loading  quiz from server', '', {
          duration: 3000
        });
      }
    );
  }
  parseStringToInt(str: any) {
    return parseInt(str);
  }
  startQuiz(quizId: any) {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      confirmButtonText: 'start',
      showCancelButton: true,
      icon: 'info'
    }).then((res) => {
      if (res.isConfirmed) {
        this.router.navigate(['start/'+quizId]);
      }
    });
  }
}
