import { BaseModel } from "../base-model";

export interface IUserAnswerDto {
    answerId?: number;
    orderIndex?: number;
    answer?: string;
}

export class UserAnswerDto extends BaseModel {

    public answerId: number;
    public orderIndex: number;
    public answer: string;

    constructor(data: IUserAnswerDto = {}) {
        super();
        this.answerId = data.answerId || 0;
        this.orderIndex = data.orderIndex || 0;
        this.answer = data.answer || "";

        this.mapFromJson(data);
    }

}