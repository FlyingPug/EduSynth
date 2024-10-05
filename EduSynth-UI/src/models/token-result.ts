export interface ITokenResult {
    accessToken: string;
    refreshToken: string;
}
export class TokenResult implements  ITokenResult {
    accessToken: string;
    refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
