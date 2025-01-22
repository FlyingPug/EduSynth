import { Answer } from "../quiz/quiz-answer-model";
import { UserAnswerDto } from "./user-answer-dto";

export class UserAnswerSessionForm {

    sessionCode: string;
    answers: UserAnswerDto[];

    constructor(sessionCode: string, answers: UserAnswerDto[]) {
        this.sessionCode = sessionCode;
        this.answers = answers;
    }

}
