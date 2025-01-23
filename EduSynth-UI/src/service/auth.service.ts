import { inject, Injectable } from "@angular/core";
import { AuthInfo } from "../models/auth.info";
import { environment } from "../enviroment/enviroment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { ITokenResult, TokenResult } from "../models/token-result";
import { BehaviorSubject, EMPTY, map, Observable } from "rxjs";
import { LoginModel } from "../models/login-model";
import { RegisterModel } from "../models/register-model";
import { IUserInfo, UserInfo } from "../models/user-info";
import { Location } from "@angular/common";
import { StompHeaders } from "@stomp/stompjs";
import { UserCredentials } from "../models/user/UserCredentials";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private http = inject(HttpClient);

    private static authenticated = true;
    private apiAuth: string = environment.apiUrl + "/public/auth/";

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

    public login(model: LoginModel): Observable<void> {
        return this.http.post<IUserInfo>(this.apiAuth + "login", model).pipe(map((result: IUserInfo) => {
            AuthService.auth(result.token);
        }));
    }

    public register(model: RegisterModel): Observable<void> {
        return this.http.post<IUserInfo>(this.apiAuth + "register", model).pipe(map((result: IUserInfo) => {
            AuthService.auth(result.token);
        }));
    }

    public changeCredentials(newCredentials : UserCredentials): Observable<void> {
        return this.http.put<IUserInfo>(this.apiAuth + "user", newCredentials).pipe(map((result: IUserInfo) => {
            AuthService.auth(result.token);
        }));
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
        // localStorage - хранилище в браузере хранящее информацию до 5мб
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
