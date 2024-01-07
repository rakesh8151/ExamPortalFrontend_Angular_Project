import { CommonModule, JsonPipe, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../../../services/question.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { error } from 'console';

@Component({
  selector: 'app-start-quiz',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    JsonPipe,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css'
})
export class StartQuizComponent {
  quizId = -1;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;
  questions = [
    {
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      givenAnswer: '',
      answer: '',
      quiz: {
        title: '',
        maxMarks: ''
      }
    }
  ];
  constructor(private locationStrategy: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.route.snapshot.params['qid'];
    this.loadQuestions();
  }
  preventBackButton() {
    history.pushState(null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, location.href);
    })
  }
  loadQuestions() {
    this.questionService.getQuestionsOfQuizForTest(this.quizId).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 10;
        this.questions.forEach((q) => {
          q.givenAnswer = '';
        });
        this.startTimer();
        console.log(this.questions);
      },
      (error) => {
        this.snack.open('Error in loading question of quiz from server', '', {
          duration: 3000
        });
      }
    );
  }
  intToString(data: any) {
    return data.toString();
  }
  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the quiz?',
      confirmButtonText: 'submit',
      showCancelButton: true,
      icon: 'info'
    }).then((res) => {
      if (res.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      }
      else {
        this.timer -= 1;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
  evalQuiz() {
    //call to server to check questions

    this.questionService.evalQuiz(this.questions).subscribe(
      (data: any) => {
        this.marksGot = data['marksGot'].toFixed(2);
        this.correctAnswers = data['correctAnswers'];
        this.attempted = data['attempted'];
        console.log(data);
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );

    //below one code uses eval on client side
    //   this.questions.forEach((q) => {
    //     if (q.givenAnswer.trim() != '') {
    //       this.attempted++;
    //       if (q.givenAnswer == q.answer) {
    //         this.correctAnswers++;
    //       }

    //     }

    //   });
    //   this.marksGot = this.correctAnswers * (Number(this.questions[0].quiz.maxMarks) / this.questions.length);
    //   console.log(this.correctAnswers);
    //   console.log(this.marksGot);
    //   this.isSubmit = true;
  }
  printPage(){
    window.print();
  }
}
