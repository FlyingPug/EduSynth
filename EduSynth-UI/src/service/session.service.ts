import { Injectable } from '@angular/core';
import {Quiz} from "../models/quiz-model";
import {SessionInfo} from "../models/session/session-info";
import {environment} from "../enviroment/enviroment.development";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiSession: string = environment.apiUrl + '/public/session';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private currentSessionData : SessionInfo | null = null;

  public get CurrentSession() : SessionInfo | null
  {
    return this.currentSessionData;
  }

  public createSession(quizId : number)
  {
    this.http.post<SessionInfo>(this.apiSession + "create-session", quizId, {headers: this.authService.AuthHeader}).subscribe(session =>
    {
      this.currentSessionData = session;
      //this.router.navigate(['/quiz/' + quiz.id]);
    });
  }

  public joinSession(sessionCode: string)
  {
    if(this.authService.isAuthorized)
    {
      this.http.post<SessionInfo>(this.apiSession + "join-session", {name: this.authService.userSubject.getValue().username, sessionCode: sessionCode}, {headers: this.authService.AuthHeader}).subscribe(session =>
      {
        this.currentSessionData = session;
        this.router.navigate(['/session/' + sessionCode]);
      });
    }
  }

  startSession() {

  }
}
