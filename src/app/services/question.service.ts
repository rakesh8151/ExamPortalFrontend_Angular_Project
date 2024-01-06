import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestions() {
    return this.http.get(baseUrl + '/question/');
  }
  public getQuestionsOfQuiz(quizId: any) {
    return this.http.get(baseUrl + '/question/quiz/all/'+quizId);
  }

  public addQuestion(question: any) {
    return this.http.post(baseUrl + '/question/', question);
  }

  public updateQuestion(question: any, questionId: any) {
    return this.http.put(baseUrl + '/question/' + questionId, question);
  }

  public deleteQuestion(questionId: any) {
    return this.http.delete(baseUrl + '/question/' + questionId);

  }
}
