import { BaseModel } from "../../base-model";
import { QuestionTypeDto } from "../question-type-model";

export interface IQuestionRequestDto {
    text: string;
    mediaUrl: string;
    timeLimitSeconds: number;
    questionType: QuestionTypeDto;
}

export abstract class QuestionRequestDto extends BaseModel {

    public text: string;
    public mediaUrl: string;
    public timeLimitSeconds: number;
    public questionType: QuestionTypeDto;

    public constructor(question: IQuestionRequestDto) {
        super();
        this.mapFromJson(question);
    }

    public abstract getQuestionType(): QuestionTypeDto;

}