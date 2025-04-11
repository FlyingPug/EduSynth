
// добиться такого состояния модели, пока имеется только refreshToken TODO: Добавить на сервак модель authInfo
export class AuthInfo {

    public accessToken: string | null;
    public refreshToken: string | null;
    public id: string | null;
    public exp: number = 0;

    constructor(accessToken: string, refreshToken: string, id: string, exp: number) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.exp = exp;
    }

}
