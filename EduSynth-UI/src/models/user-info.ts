export interface IUserInfo {
    username: string;
    token: string;
    email: string;
    role : string;
    profilePictureUrl : string;
    balance : number;
}

export class UserInfo implements  IUserInfo {
    username: string;
    token: string;
    email: string;
    role : string;
    profilePictureUrl : string;
    balance : number;

    constructor(username: string, token: string, email: string, role: string, profilePictureUrl: string, balance: number) {
        this.username = username;
        this.token = token;
        this.email = email;
        this.role = role;
        this.profilePictureUrl = profilePictureUrl;
        this.balance = balance;
    }
}
