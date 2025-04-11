import { inject, Injectable } from "@angular/core";
import { AuthInfo } from "../models/user/auth.info";
import { environment } from "../enviroment/enviroment.development";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { LoginModel } from "../models/user/login-model";
import { RegisterModel } from "../models/user/register-model";
import { StompHeaders } from "@stomp/stompjs";
import { UserCredentials } from "../models/user/UserCredentials";
import { IUser } from "../models/user/user-model";

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
        return this.http.post<IUser>(this.apiAuth + "login", model).pipe(map((result: IUser) => {
            AuthService.auth(result.token);
        }));
    }

    public register(model: RegisterModel): Observable<void> {
        return this.http.post<IUser>(this.apiAuth + "register", model).pipe(map((result: IUser) => {
            AuthService.auth(result.token);
        }));
    }

    public changeCredentials(newCredentials : UserCredentials): Observable<void> {
        return this.http.put<IUser>(this.apiAuth + "user", newCredentials).pipe(map((result: IUser) => {
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
