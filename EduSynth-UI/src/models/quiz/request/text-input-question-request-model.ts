import { QuestionTypeDto } from "../question-type-model";
import { IQuestionRequestDto, QuestionRequestDto } from "./question-request-model";

export interface ITextInputQuestionRequestDto extends IQuestionRequestDto {
    correctAnswer: string;
}

export class TextInputQuestionRequestDto extends QuestionRequestDto {

    public correctAnswer: string;

    public constructor(question: ITextInputQuestionRequestDto) {
        super(question);
        this.correctAnswer = question.correctAnswer;
    }

    public getQuestionType(): QuestionTypeDto {
        return QuestionTypeDto.INPUT_TEXT;
    }

}