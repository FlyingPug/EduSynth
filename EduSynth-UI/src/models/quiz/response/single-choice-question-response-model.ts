import { AnswerResponseDto, IAnswerResponseDto } from "./answer-response-model";
import { IQuestionResponseDto, QuestionResponseDto } from "./question-response-model";

export interface ISingleChoiceQuestionResponseDto extends IQuestionResponseDto {
    answers: IAnswerResponseDto[];
}

export class SingleChoiceQuestionResponseDto extends QuestionResponseDto {

    public answers: AnswerResponseDto[];

    public constructor(question: ISingleChoiceQuestionResponseDto) {
        super(question);
        this.answers = question.answers?.map(a => new AnswerResponseDto(a)) || [];
    }

}