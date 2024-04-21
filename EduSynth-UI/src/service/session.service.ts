import { Injectable } from '@angular/core';
import {Quiz} from "../models/quiz-model";
import {SessionInfo} from "../models/session/session-info";
import {environment} from "../enviroment/enviroment.development";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, observable} from "rxjs";
import {IUserInfo} from "../models/user-info";
import {SessionState} from "../models/enums/session-state";
import {RxStompService} from "./rx-stomp-service";
import {SessionShortInfo} from "../models/session/session-short-info";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiSession: string = environment.apiUrl + '/public/session';
  private currentSessionData :  BehaviorSubject<SessionInfo> = new BehaviorSubject<SessionInfo>({} as SessionInfo);

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private rxStompService: RxStompService)
  {
    console.log('sheise');
    this.rxStompService.watch('/topic/session').subscribe( (message) => {
      if (message.body) {
        console.log('New message received:', message.body);
        let session : SessionShortInfo = JSON.parse(message.body);

        const tempData: SessionInfo = {...this.currentSessionData.getValue(), participants: session.participantDtoList};

        this.currentSessionData.next(tempData);
        console.log('Done',tempData);
        if(session.sessionState == SessionState.WAITING)
        {
          console.log('waiting');
        }
      }
    })
  }

  public get CurrentSession()  :  BehaviorSubject<SessionInfo>
  {
    return this.currentSessionData;
  }

  public createSession(quizId : number)
  {
    this.http.post<SessionInfo>(this.apiSession + "/create-session", quizId, {headers: this.authService.AuthHeader}).subscribe(session =>
    {
      console.log('Its okay', session);
      this.currentSessionData.next(session);
      this.router.navigate(['/lobby/' + session.sessionCode]);
    });
  }

  public joinSession(sessionCode: string)
  {
    if(this.authService.isAuthorized)
    {
      this.http.post<SessionInfo>(this.apiSession + "join-session", {name: this.authService.userSubject.getValue().username, sessionCode: sessionCode}, {headers: this.authService.AuthHeader}).subscribe(session =>
      {
        this.currentSessionData.next(session);
        this.router.navigate(['/lobby/' + sessionCode]);
      });
    }
  }

  startSession() {
    console.log('СТАРТУЕМ');
  }
}
