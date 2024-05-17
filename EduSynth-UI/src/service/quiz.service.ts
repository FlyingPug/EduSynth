import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../enviroment/enviroment.development";
import {Query} from "../models/query";
import {Observable} from "rxjs";
import {QuizTitleModel} from "../models/quiz/quiz-title-model";
import {Page} from "../models/page";
import {Quiz} from "../models/quiz/quiz-model";
import {Question} from "../models/quiz/quiz-question-model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiQuiz: string = environment.apiUrl + '/public/quiz';
  constructor(private http: HttpClient, private router: Router) { }

  private quizData : Quiz | null = null;

  public getQuizTitles(query: Query) : Observable<Page<QuizTitleModel>> {
    let params = new HttpParams();
    params = params.append("page", query.pageNumber);
    params = params.append("size", query.pageSize);

    return this.http.get<Page<QuizTitleModel>>(this.apiQuiz + "/quizzes", {params: params});
  }

  public createNewQuiz(name : string, description : string, isPublic : boolean, titleImageUrl : string)
  {
    this.quizData  = new Quiz(name, description, titleImageUrl, isPublic);
  }

  public addQuestion(question : Question)
  {
    this.quizData?.questions.push(question);
  }

  finishQuizCreation() {
    console.log(this.quizData);
    const jwtToken = localStorage.getItem('access-token'); // получаем токен из localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    this.http.post<Quiz>(this.apiQuiz, this.quizData, {headers: headers}).subscribe(quiz =>
    {
      this.router.navigate(['/quiz/' + quiz.id]);
    });
    this.quizData = null;
  }

  startQuiz(id: number) {

  }

  getQuiz(id: number) : Observable<Quiz> {
    const url = `${this.apiQuiz}/${id}`;

    return this.http.get<Quiz>(url);
  }
}
