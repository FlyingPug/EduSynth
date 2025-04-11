import { BaseModel } from "../base-model";

export interface IUser {
    id: number;
    username: string;
    token: string;
    email: string;
    role : string;
    profilePictureUrl : string;
    balance : number;
}

export class User extends BaseModel implements IUser {

    public id: number;
    public username: string;
    public token: string;
    public email: string;
    public role : string;
    public profilePictureUrl : string;
    public balance : number;

    public constructor(user: IUser) {
        super();
        this.mapFromJson(user);
    }

}
