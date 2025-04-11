import { BaseModel } from "../../base-model";
import { QuestionTypeDto } from "../question-type-model";

export interface IQuestionResponseDto {
    id: number;
    text: string;
    mediaUrl: string;
    timeLimitSeconds: number;
    quizId: number;
    questionType: QuestionTypeDto;
}

export abstract class QuestionResponseDto extends BaseModel {

    public id: number;
    public text: string;
    public mediaUrl: string;
    public timeLimitSeconds: number;
    public quizId: number;
    public questionType: QuestionTypeDto;

    public constructor(question: IQuestionResponseDto) {
        super();
        this.mapFromJson(question);
    }

}