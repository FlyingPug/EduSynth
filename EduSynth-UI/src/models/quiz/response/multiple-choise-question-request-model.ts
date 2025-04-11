import { AnswerResponseDto, IAnswerResponseDto } from "./answer-response-model";
import { IQuestionResponseDto, QuestionResponseDto } from "./question-response-model";

export interface IMultipleChoiceQuestionResponseDto extends IQuestionResponseDto {
    answers: IAnswerResponseDto[];
}

export class MultipleChoiceQuestionResponseDto extends QuestionResponseDto {

    public answers: AnswerResponseDto[];

    public constructor(question: IMultipleChoiceQuestionResponseDto) {
        super(question);
        this.answers = question.answers?.map(a => new AnswerResponseDto(a)) || [];
    }

}
