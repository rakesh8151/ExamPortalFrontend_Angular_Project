import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public Quizzes(){
    return this.http.get(baseUrl+'/quiz/');
  }
  public addQuiz(quiz:any){
    return this.http.post(baseUrl+'/quiz/',quiz);
  }

  public deleteQuiz(quizId:any){
    return this.http.delete(baseUrl+'/quiz/'+quizId);
  }

  //get the  quizzes of category
  public getQuizzesOfCategory(catId:any){
    return this.http.get(baseUrl+'/quiz/category/'+catId);
  }

  public getQuiz(quizId:any){
    return this.http.get(baseUrl+'/quiz/'+quizId);
  }

  //update the quiz

  public updateQuiz(quiz:any,quizId:any){
    return this.http.put(baseUrl+'/quiz/'+quizId,quiz);
  }
  //get active quiz
  public activeQuizzes(){
    return this.http.get(baseUrl+'/quiz/active');
  }

  //get active quizzes of category
  public activeQuizzesOfCategory(categoryId:any){
    return this.http.get(baseUrl+'/quiz/category/active/'+categoryId,categoryId);
  }

}
