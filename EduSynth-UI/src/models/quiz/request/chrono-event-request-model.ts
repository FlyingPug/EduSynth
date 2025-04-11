import { BaseModel } from "../../base-model";

export interface IChronoEventRequestDto {
    text: string;
    orderIndex: number;
}

export class ChronoEventRequestDto extends BaseModel {

    public text: string;
    public orderIndex: number;

    public constructor(event: IChronoEventRequestDto) {
        super();
        this.mapFromJson(event);
    }

}
