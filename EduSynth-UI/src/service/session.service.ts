import { Injectable, OnDestroy } from '@angular/core';
import { SessionInfo } from '../models/session/session-info';
import { environment } from '../enviroment/enviroment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionState } from '../models/enums/session-state';
import { RxStompService } from './rx-stomp-service';
import { SessionShortInfo } from '../models/session/session-short-info';
import { UserAnswerSessionForm } from '../models/session/user-answer-session-form';
import { SessionCodeDto } from '../models/session/session-code-dto';
import { SessionResultDto } from '../models/session/session-result-dto';
import { UserAnswerDto } from '../models/session/user-answer-dto';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements OnDestroy {
    private apiSession: string = environment.apiUrl + '/public/session';
    private currentSessionData :  SessionInfo | null = null;
    private sessionState  :  BehaviorSubject<SessionShortInfo | null> = new BehaviorSubject<SessionShortInfo | null>(null);

    ngOnDestroy(): void {
        console.log('DESTROYING SESSION :(');
    }

    constructor(private http: HttpClient, private router: Router, private authService: AuthService, private rxStompService: RxStompService) {
        console.log('CREATING SESSION SERVICE');
        this.sessionState.subscribe(newValue => {
            console.log('THIS SHEISE IS UPDATING', newValue);
        });
    }

    private watchSession(code: string) {
        if (this.currentSessionData?.quiz) {
            this.rxStompService.watch('/topic/session/' + code).subscribe(message => {
                if (message.body) {
                    console.log('New message received:', message.body);
                    const session: SessionShortInfo = JSON.parse(message.body);
                    const currentSession = this.currentSessionState.getValue();
                    this.sessionState.next(session);
                    if (session.sessionState == SessionState.STARTED) {
                        const nextQuestionId = session.currentQuestionId;
                        if (currentSession && nextQuestionId != currentSession.currentQuestionId) {
                            console.log('NAVIGATE');
                            this.router.navigate(['/question/' + this.currentSessionData?.quiz.questions[nextQuestionId].type]);
                        }
                    } else if (session.sessionState == SessionState.ENDED) {
                        this.router.navigate(['/result/' + this.currentSessionData?.sessionCode]);
                    }
                    console.log('Done', session);
                    console.log('Done2', this.currentSessionState.getValue());
                }
            });
        } else {
            console.log('не удается подписать на сессию');
        }

    }

    public get currentSession()  :  SessionInfo | null {
        return this.currentSessionData;
    }

    public get currentSessionState()  :  BehaviorSubject<SessionShortInfo | null> {
        return this.sessionState;
    }

    public createSession(quizId : number) {
        this.http.post<SessionInfo>(this.apiSession + '/create-session', quizId, { headers: this.authService.AuthHeader }).subscribe(session => {
            console.log('Its okay', session);
            this.currentSessionData = session;
            this.sessionState.next(
                {
                    sessionState: SessionState.WAITING,
                    currentQuestionId: -1,
                    timeRemainingToNextQuestionSec: 0,
                    participantDtoList: session.participants
                });
            this.watchSession(session.sessionCode);
            this.router.navigate(['/lobby/' + session.sessionCode]);
        });
    }

    public joinSession(sessionCode: string) {
        if (this.authService.isAuthorized) {
            this.http.post<SessionInfo>(this.apiSession + '/join-session', { name: this.authService.userSubject.getValue().username, sessionCode: sessionCode }, { headers: this.authService.AuthHeader }).subscribe(session => {
                this.currentSessionData = session;
                this.watchSession(session.sessionCode);
                this.router.navigate(['/lobby/' + sessionCode]);
            });
        }
    }

    public startSession() {
        if (this.currentSessionData?.sessionCode) {
            this.http.post(this.apiSession + '/start-session', new SessionCodeDto(this.currentSessionData.sessionCode), { headers: this.authService.AuthHeader }).subscribe();
        }
    }

    public answer(answers: UserAnswerDto[]) {
        if (this.currentSessionData?.sessionCode) {
            this.http.post(this.apiSession + '/answer-question', new UserAnswerSessionForm(this.currentSessionData.sessionCode, answers), { headers: this.authService.AuthHeader }).subscribe(answer => {});
        }
    }

    public getResult(sessionCode : string) : Observable<SessionResultDto> {
        return this.http.get<SessionResultDto>(this.apiSession + '/participant-results/' + sessionCode, { headers: this.authService.AuthHeader });
    }

    public get currentQuestion() {
        const index = this.currentSessionState.getValue()?.currentQuestionId;
        console.log('GETTING QUESTION YAY', this.currentSessionState.getValue());
        if (index !== undefined) {
            console.log('GETTING QUESTION index', index);
            return this.currentSessionData?.quiz.questions[index];
        }
        return undefined;
    }
}
