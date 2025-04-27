import { BaseModel } from "../base-model";

export class ParticipantDto extends BaseModel {

    public leader: boolean;
    public name: string;
    public imageUrl: string;
    public score: number;

    constructor(participant: IParticipantDto) {
        super();
        this.mapFromJson(participant);
    }

}

export interface IParticipantDto {
    name: string;
    imageUrl: string;
    score: number;
    leader: boolean;
}
