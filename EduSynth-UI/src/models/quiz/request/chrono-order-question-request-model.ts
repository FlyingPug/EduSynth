import { QuestionTypeDto } from "../question-type-model";
import { ChronoEventRequestDto, IChronoEventRequestDto } from "./chrono-event-request-model";
import { IQuestionRequestDto, QuestionRequestDto } from "./question-request-model";

export interface IChronoOrderQuestionRequestDto extends IQuestionRequestDto {
    events: IChronoEventRequestDto[];
}

export class ChronoOrderQuestionRequestDto extends QuestionRequestDto {

    public events: ChronoEventRequestDto[];

    public constructor(question: IChronoOrderQuestionRequestDto) {
        super(question);
        this.events = question.events?.map(e => new ChronoEventRequestDto(e)) || [];
    }

    public getQuestionType(): QuestionTypeDto {
        return QuestionTypeDto.CHRONO;
    }

}