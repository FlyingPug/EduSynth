import { BaseModel } from "../base-model";

export interface IUserAnswerDto {
    answerId?: number;
    selectedIds?: Set<number> | number[];
    orderIndex?: number;
    answer?: string;
}

export class UserAnswerDto extends BaseModel {

    public answerId: number;
    public selectedIds: Set<number>;
    public orderIndex: number;
    public answer: string;

    constructor(data: IUserAnswerDto = {}) {
        super();
        this.answerId = data.answerId || 0;
        this.selectedIds = data.selectedIds ? 
            (data.selectedIds instanceof Set ? data.selectedIds : new Set(data.selectedIds)) : 
            new Set<number>();
        this.orderIndex = data.orderIndex || 0;
        this.answer = data.answer || "";

        this.mapFromJson(data);
    }

    public addSelectedId(id: number): void {
        this.selectedIds.add(id);
    }

    public removeSelectedId(id: number): boolean {
        return this.selectedIds.delete(id);
    }

    public hasSelectedId(id: number): boolean {
        return this.selectedIds.has(id);
    }

}