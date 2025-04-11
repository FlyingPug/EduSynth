import { QuestionTypeDto } from "../question-type-model";
import { AnswerRequestDto, IAnswerRequestDto } from "./answer-request-model";
import { IQuestionRequestDto, QuestionRequestDto } from "./question-request-model";

export interface ISingleChoiceQuestionRequestDto extends IQuestionRequestDto {
    answers: IAnswerRequestDto[];
}

export class SingleChoiceQuestionRequestDto extends QuestionRequestDto {

    public answers: AnswerRequestDto[];

    public constructor(question: ISingleChoiceQuestionRequestDto) {
        super(question);
        this.answers = question.answers?.map(a => new AnswerRequestDto(a)) || [];
    }

    public getQuestionType(): QuestionTypeDto {
        return QuestionTypeDto.CHOOSE_OPTION;
    }

}