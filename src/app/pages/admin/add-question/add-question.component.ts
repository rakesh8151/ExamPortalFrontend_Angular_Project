import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, JsonPipe, isPlatformBrowser } from '@angular/common';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    JsonPipe,
    CommonModule,
    CKEditorModule
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
//  public Editor=ClassicEditor;
  isBrowser = false;
  quizId = -1;
  quizTitle = '';
  question = {
    quiz: {
      qid: -1
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }
  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private snack: MatSnackBar,
    ) { 
      // this.isBrowser = isPlatformBrowser(PLATFORM_ID);
      // if (this.isBrowser) {
      //    const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
      //    this.Editor = ClassicEditor;
      //    this.Editor.defaultConfig = {
            
      //    };
      // }
    }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params['quizId']
    this.question.quiz.qid = this.quizId;
    this.quizTitle = this.route.snapshot.params['title'];
  }

  addQuestion() {
    if (this.question.quiz.qid == -1 || this.question.quiz.qid == null) {
      this.snack.open('something went  wrong', '', {
        duration: 3000
      });
      return;
    }
    if (this.question.content.trim() == '' || this.question.content == null) {
      this.snack.open('quiz content is required', '', {
        duration: 3000
      });
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this.snack.open('option1  is required', '', {
        duration: 3000
      });
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this.snack.open('option2  is required', '', {
        duration: 3000
      });
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      this.snack.open('answer is required', '', {
        duration: 3000
      });
      return;
    }
    this.questionService.addQuestion(this.question).subscribe(
      (data: any) => {
        this.question.content = '',
          this.question.option1 = '',
          this.question.option2 = '',
          this.question.option3 = '',
          this.question.option4 = '',
          this.question.answer = ''
        Swal.fire('Success !!', 'question added successfully , Add another question', 'success');
      },
      (error) => {
        Swal.fire('Error !!', 'Error in adding questions !!', 'error')
      }
    );
  }

}
