import { BaseModel } from "../../base-model";

export interface ICrosswordCellRequestDto {
    correctText: string;
    positionX: number;
    positionY: number;
}

export class CrosswordCellRequestDto extends BaseModel {

    public correctText: string;
    public positionX: number;
    public positionY: number;

    public constructor(cell: ICrosswordCellRequestDto) {
        super();
        this.mapFromJson(cell);
    }

}