import { BaseModel } from "../../base-model";

export class AnswerRequestDto extends BaseModel {

    public text: string;
    public mediaUrl: string;
    public isCorrect: boolean;

    public constructor(answer: IAnswerRequestDto ) {
        super();
        this.mapFromJson(answer);
    }

}

export interface IAnswerRequestDto {

    text: string;
    mediaUrl: string;
    isCorrect: boolean;

}