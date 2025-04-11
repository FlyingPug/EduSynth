import { IParticipantDto, ParticipantDto } from "./participant-model";
import { BaseModel } from "../base-model";
import { IQuizResponseDto, QuizResponseDto } from "../quiz/response/quiz-response-model";
import { DurationDto } from "./duration-model";
import { SessionStatusDto } from "./session-status-model";

export class SessionDto extends BaseModel {

    public id: string;
    public quiz: QuizResponseDto;
    public status: SessionStatusDto;
    public startTime: Date;
    public currentQuestionIndex: number;
    public participants: ParticipantDto[];
    public questionTimeLimit: DurationDto;
    public timeExpired: boolean;
    public finished: boolean;

    constructor(session: ISessionDto) {
        super();
        this.mapFromJson(session);
        this.quiz = new QuizResponseDto(session.quiz);
        this.participants = session.participants?.map(p => new ParticipantDto(p)) || [];
        this.startTime = new Date(session.startTime);
    }

}

export interface ISessionDto {
    id: string;
    quiz: IQuizResponseDto;
    status: SessionStatusDto;
    startTime: string; // ISO string format for Instant
    currentQuestionIndex: number;
    participants: IParticipantDto[];
    questionTimeLimit: DurationDto;
    timeExpired: boolean;
    finished: boolean;
}