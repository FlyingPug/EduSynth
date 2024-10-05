export class UserAnswerDto {
    answerId: number;
    answer: string;


    constructor(answerId: number, answer: string) {
        this.answerId = answerId;
        this.answer = answer;
    }
}
