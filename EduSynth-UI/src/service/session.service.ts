import { inject, Injectable } from "@angular/core";
import { RxStompService } from "./rx-stomp-service";
import { IUserAnswerDto } from "../models/session/user-answer-model";
import { ApiClient } from "./api.service";
import { map, Observable } from "rxjs";
import { SessionStateDto } from "../models/session/session-state-model";
import { SessionDto } from "../models/session/session-model";
import { UserAnswerFormDto } from "../models/session/user-answer-session-form";

@Injectable({
    providedIn: "root"
})
export class SessionService {

    private api = inject(ApiClient);
    private rxStompService = inject(RxStompService);

    private apiSession: string = "/private/session";

    public async createSession(quizId : number) : Promise<SessionDto> {
        const data = await this.api.post(this.apiSession, quizId);
        return new SessionDto(data);
    }

    public async joinSession(sessionCode: string) : Promise<SessionDto> {
        const data = await this.api.simplePost(this.apiSession + `/${sessionCode}/join`);
        return new SessionDto(data);
    }

    public watchSession(code: string): Observable<SessionStateDto> {
        return this.rxStompService.watch("/topic/session/" + code).pipe(map(message => {
            const session: SessionStateDto = JSON.parse(message.body);
            return session;
        }));
    }

    public async startSession(sessionCode: string): Promise<void> {
        await this.api.simplePost(this.apiSession + `/${sessionCode}/start`);
    }

    public async getSession(sessionCode: string): Promise<SessionDto> {
        return await this.api.get(this.apiSession + `/${sessionCode}`);
    }

    public async answer(sessionCode: string, answers: IUserAnswerDto[]): Promise<void> {
        await this.api.post(
            this.apiSession + `/${sessionCode}/answer`,
            answers
        );
    }

}
