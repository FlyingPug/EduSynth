import { BaseModel } from "../base-model";
import { IUserAnswerDto } from "./user-answer-model";

export class UserAnswerFormDto extends BaseModel {

    public sessionCode: string;
    public answers: IUserAnswerDto[];

    constructor(sessionCode: string, answers: IUserAnswerDto[]) {
        super();
        this.sessionCode = sessionCode;
        this.answers = answers;
    }

}
