import { BaseModel } from "../../base-model";

export class AnswerResponseDto extends BaseModel {

    public id: number;
    public text: string;
    public mediaUrl: string;

    public constructor(answer: IAnswerResponseDto) {
        super();
        this.mapFromJson(answer);
    }

}

export interface IAnswerResponseDto {
    id: number;
    text: string;
    mediaUrl: string;
}