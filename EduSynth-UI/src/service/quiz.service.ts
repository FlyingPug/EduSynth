import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../enviroment/enviroment.development";
import {Query} from "../models/query";
import {Observable} from "rxjs";
import {QuizTitleModel} from "../models/quiz-title-model";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiQuiz: string = environment.apiUrl + '/public/quiz';
  constructor(private http: HttpClient) { }

  public getQuizTitles(query: Query) : Observable<Page<QuizTitleModel>> {
    let params = new HttpParams();
    params = params.append("page", query.pageNumber);
    params = params.append("size", query.pageSize);

    return this.http.get<Page<QuizTitleModel>>(this.apiQuiz + "/quizzes", {params: params});
  }
}