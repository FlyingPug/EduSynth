import { BaseModel } from "../../base-model";

export interface IChronoEventResponseDto {
    id: number;
    text: string;
}

export class ChronoEventResponseDto extends BaseModel {

    public id: number;
    public text: string;

    public constructor(event: IChronoEventResponseDto) {
        super();
        this.mapFromJson(event);
    }

}