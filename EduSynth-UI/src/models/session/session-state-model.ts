import { BaseModel } from "../base-model";
import { DurationDto } from "./duration-model";
import { IParticipantDto, ParticipantDto } from "./participant-model";
import { SessionStatusDto } from "./session-status-model";

export interface ISessionStateDto {
    sessionId: string;
    status: SessionStatusDto;
    currentQuestionIndex: number;
    questionTimeLimit: DurationDto;
    timeRemaining: number;
    participants: IParticipantDto[];
}

export class SessionStateDto extends BaseModel {

    public sessionId: string;
    public status: SessionStatusDto;
    public currentQuestionIndex: number;
    public questionTimeLimit: DurationDto;
    public timeRemaining: number;
    public participants: ParticipantDto[];

    constructor(state: ISessionStateDto) {
        super();
        this.mapFromJson(state);
        this.participants = state.participants?.map(p => new ParticipantDto(p)) || [];
    }

}