import { BaseModel } from "../../base-model";

export interface ICrosswordCellResponseDto {
    id: number;
    length: number;
    positionX: number;
    positionY: number;
}

export class CrosswordCellResponseDto extends BaseModel {

    public id: number;
    public length: number;
    public positionX: number;
    public positionY: number;

    public constructor(cell: ICrosswordCellResponseDto) {
        super();
        this.mapFromJson(cell);
    }

}