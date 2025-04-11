import { IQuestionResponseDto, QuestionResponseDto } from "./question-response-model";

export interface ITextInputQuestionResponseDto extends IQuestionResponseDto {
    answerLength: number;
}

export class TextInputQuestionResponseDto extends QuestionResponseDto {

    public answerLength: number;

    public constructor(question: ITextInputQuestionResponseDto) {
        super(question);
        this.answerLength = question.answerLength;
    }

}
