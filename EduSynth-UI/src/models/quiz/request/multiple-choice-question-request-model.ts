import { QuestionTypeDto } from "../question-type-model";
import { AnswerRequestDto, IAnswerRequestDto } from "./answer-request-model";
import { IQuestionRequestDto, QuestionRequestDto } from "./question-request-model";

export interface IMultipleChoiceQuestionRequestDto extends IQuestionRequestDto {
    answers: IAnswerRequestDto[];
}

export class MultipleChoiceQuestionRequestDto extends QuestionRequestDto {

    public answers: AnswerRequestDto[];

    public constructor(question: IMultipleChoiceQuestionRequestDto) {
        super(question);
        this.answers = question.answers?.map(a => new AnswerRequestDto(a)) || [];
    }

    public getQuestionType(): QuestionTypeDto {
        return QuestionTypeDto.MULTIPLE;
    }

}