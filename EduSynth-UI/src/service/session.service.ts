import { inject, Injectable } from "@angular/core";
import { SessionInfo } from "../models/session/session-info";
import { environment } from "../enviroment/enviroment.development";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionState } from "../models/enums/session-state";
import { RxStompService } from "./rx-stomp-service";
import { SessionShortInfo } from "../models/session/session-short-info";
import { UserAnswerSessionForm } from "../models/session/user-answer-session-form";
import { SessionCodeDto } from "../models/session/session-code-dto";
import { SessionResultDto } from "../models/session/session-result-dto";
import { UserAnswerDto } from "../models/session/user-answer-dto";
import { Question } from "../models/quiz/quiz-question-model";
import { ApiClient } from "./api.service";
import { UserService } from "./user.service";
import { ParticipantInfo } from "../models/session/participant-info";

@Injectable({
    providedIn: "root"
})
export class SessionService {

    private api = inject(ApiClient);
    private router = inject(Router);
    private rxStompService = inject(RxStompService);

    private apiSession: string = "/public/session";
    private currentSessionData : SessionInfo | null = null;
    private sessionState : BehaviorSubject<SessionShortInfo | null> = new BehaviorSubject<SessionShortInfo | null>(null);

    constructor() {
        this.sessionState.subscribe(newValue => {
            console.log("THIS SHEISE IS UPDATING", newValue);
        });
    }

    public get currentSession() : SessionInfo | null {
        return this.currentSessionData;
    }

    public get currentSessionState() : BehaviorSubject<SessionShortInfo | null> {
        return this.sessionState;
    }

    public async createSession(quizId : number) : Promise<void> {
        this.api.post(
            this.apiSession + "/create-session", quizId,
        ).then(async session => {
            this.currentSessionData = session;
            this.sessionState.next({
                sessionState: SessionState.WAITING,
                currentQuestionId: -1,
                timeRemainingToNextQuestionSec: 0,
                participantDtoList: session.participants
            });
            this.watchSession(session.sessionCode);
            await this.router.navigate(["/lobby/" + session.sessionCode]);
        });
    }

    public joinSession(sessionCode: string) : void {
        this.api.post(this.apiSession + "/join-session",
            {
                sessionCode: sessionCode
            })
            .then(async session => {
                this.currentSessionData = session;
                this.watchSession(session.sessionCode);
                await this.router.navigate(["/lobby/" + sessionCode]);
            });
    }

    private watchSession(code: string): void {
        if (this.currentSessionData?.quiz) {
            this.rxStompService.watch("/topic/session/" + code).subscribe(async message => {
                if (message.body) {

                    const session: SessionShortInfo = JSON.parse(message.body);
                    const currentSession = this.currentSessionState.getValue();

                    this.sessionState.next(session);

                    if (session.sessionState == SessionState.STARTED) {
                        const nextQuestionId = session.currentQuestionId;
                        if (currentSession && nextQuestionId != currentSession.currentQuestionId) {
                            await this.router.navigate(["/question/" + this.currentSessionData?.quiz.questions[nextQuestionId].type]);
                        }
                    } else if (session.sessionState == SessionState.ENDED) {
                        await this.router.navigate(["/result/" + this.currentSessionData?.sessionCode]);
                    }
                }
            });
        } else {
            throw new Error("Cant subscribe to session!");
        }
    }

    public async startSession(): Promise<void> {
        if (this.currentSessionData?.sessionCode) {
            await this.api.post(this.apiSession + "/start-session", new SessionCodeDto(this.currentSessionData.sessionCode));
        }
    }

    public async getUserParticipant(): Promise<ParticipantInfo> {
        return await this.api.get(this.apiSession + "/get-participant/" + this.currentSessionData?.sessionCode);
    }

    public async answer(answers: UserAnswerDto[]): Promise<void> {
        if (this.currentSessionData?.sessionCode) {
            await this.api.post(
                this.apiSession + "/answer-question",
                new UserAnswerSessionForm(this.currentSessionData.sessionCode, answers)
            );
        }
    }

    public getResult(sessionCode : string) : Promise<SessionResultDto | null> {
        return this.api.get<SessionResultDto>(
            this.apiSession + "/participant-results/" + sessionCode
        );
    }

    public get currentQuestion(): Question | undefined {
        const index = this.currentSessionState.getValue()?.currentQuestionId;
        if (index !== undefined) {
            return this.currentSessionData?.quiz.questions[index];
        }
        return undefined;
    }

}
