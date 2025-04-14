import { inject, Injectable } from "@angular/core";
import { AuthInfo } from "../models/user/auth.info";
import { LoginModel } from "../models/user/login-model";
import { RegisterModel } from "../models/user/register-model";
import { StompHeaders } from "@stomp/stompjs";
import { UserCredentials } from "../models/user/UserCredentials";
import { IUser } from "../models/user/user-model";
import { ApiClient } from "./api.service";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private api = inject(ApiClient);

    private static authenticated = true;
    private apiAuth: string = "/public/auth/";

    public static isAuthorized(): boolean {
        return AuthService.authenticated;
    }

    public get stompHeader(): StompHeaders {
        const jwtToken = localStorage.getItem("access-token"); // получаем токен из localStorage

        return { "Authorization": `Bearer ${jwtToken}` };
    }

    public static get authToken(): string | null {
        const token = localStorage.getItem("access-token");
        if (!token || !this.isTokenValid(token)) {
            return null;
        }
        return token;
    }

    public async login(model: LoginModel): Promise<void> {
        const result = await this.api.post(this.apiAuth + "login", model);
        AuthService.auth(result.token);
    }

    public async register(model: RegisterModel): Promise<IUser> {
        const user = await this.api.post(this.apiAuth + "register", model);
        AuthService.auth(user.token);
        return user;
    }

    public async changeCredentials(newCredentials : UserCredentials): Promise<void> {
        const result = await this.api.put(this.apiAuth + "user", newCredentials);
        AuthService.auth(result.token);
    }

    private static auth(token: string): void {
        const authInfo = AuthService.decodeJwt(token, "0");
        AuthService.updateTokens(authInfo);
        AuthService.authenticated = true;
    }

    public static logout(): void {
        AuthService.updateTokens(null);
        AuthService.authenticated = false;
    }

    private static updateTokens(authInfo: AuthInfo | null): void {
        if (!authInfo) {
            localStorage.removeItem("access-token");
            localStorage.removeItem("refresh-token");
            return;
        }

        if (authInfo.accessToken && authInfo.refreshToken) {
            localStorage.setItem("access-token", authInfo.accessToken);
            localStorage.setItem("refresh-token", authInfo.refreshToken);
        }
    }

    private static decodeJwt(accessToken: string, refreshToken: string): AuthInfo {
        const base64Url = accessToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const json = window.atob(base64);
        const payload = JSON.parse(json);

        return new AuthInfo(accessToken, refreshToken, payload.id, payload.exp);
    }

    private static isTokenValid(token : string) : boolean {
        const accessToken = JSON.parse(atob(token.split(".")[1]));
        const expires = new Date(accessToken.exp * 1000);
        return expires.getTime() - Date.now() > 0;
    }

}
