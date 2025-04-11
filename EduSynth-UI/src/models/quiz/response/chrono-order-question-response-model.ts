import { ChronoEventResponseDto, IChronoEventResponseDto } from "./chrono-event-response-model";
import { IQuestionResponseDto, QuestionResponseDto } from "./question-response-model";

export interface IChronoOrderQuestionResponseDto extends IQuestionResponseDto {
    events: IChronoEventResponseDto[];
}

export class ChronoOrderQuestionResponseDto extends QuestionResponseDto {

    public events: ChronoEventResponseDto[];

    public constructor(question: IChronoOrderQuestionResponseDto) {
        super(question);
        this.events = question.events?.map(e => new ChronoEventResponseDto(e)) || [];
    }

}