import { Injectable } from "@angular/core";
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

    private authInfo: AuthInfo | null = null;
    private apiAuth: string = environment.apiUrl + "/public/auth/";
    private userAPI: string = environment.apiUrl + "/public/user";
    private tokenSubject: BehaviorSubject<ITokenResult>;
    private isInitialized: boolean = false;
    private user : UserInfo | null = null;
    public userSubject: BehaviorSubject<IUserInfo>; // TODO: ALERT ALERT замени на нормальный геттер прошууууууу

    constructor(
        private http: HttpClient,
        private router: Router,
        private location: Location
    ) {
    // наблюдаемый субъект, отличие BehaviorSubject от Subject в том, что BehaivourSubject имеет начальное значение
    // , он всегда кидает какое-то актуальное состояние
        this.tokenSubject = new BehaviorSubject<ITokenResult>({} as ITokenResult);
        this.userSubject = new BehaviorSubject<IUserInfo>(
            {
                username : "",
                balance: 0,
                token : "",
                role: "",
                email: "",
                profilePictureUrl: ""
            });

        this.tokenSubject.subscribe((token: ITokenResult) => {
            // инициализация, нет смысла что-либо либо обрабатывать
            if (!this.isInitialized) {
                this.isInitialized = true;
                return;
            }
            // значение токена поменялось

            // Пытаемся понять та же это сессия, сохранилась ли инфа
            const isNewSession = !this.authInfo;

            // если у нас нету токена, т.е входы не выполнен, переправляем на страницу входа
            if (!token?.accessToken) {
                this.authInfo = null;

                if (!isNewSession) {
                    this.updateTokens();
                }

                //this.stopRefreshTokenTimer();
                this.router.navigate(["auth/login"]);

                return;
            }

            this.authInfo = this.decodeJwt(token.accessToken, token.refreshToken);
            //this.authInfo.refreshToken = token.refreshToken;

            this.updateTokens();

            if (!this.userSubject.getValue().username) {
                console.log("получаю пользователя");
                this.getCurrentUserInfo().then();
            }

            if (isNewSession) {
                //this.startRefreshTokenTimer();
                // если мы сейчас на странице логина/регистрации переходим на главную
                if (this.router.routerState.snapshot.url.indexOf("/auth/") === 0) {
                    this.router.navigate(["/"]);
                }
            }
        });
    }

    public get isAuthorized(): boolean {
        return !!this.authInfo?.accessToken;
    }

    public get StompHeader(): StompHeaders {
        const jwtToken = localStorage.getItem("access-token"); // получаем токен из localStorage

        return { "Authorization": `Bearer ${jwtToken}` };
    }

    public get AuthHeader(): HttpHeaders {
        const jwtToken = localStorage.getItem("access-token"); // получаем токен из localStorage

        return new HttpHeaders({
            "Authorization": `Bearer ${jwtToken}`
        });
    }

    public async getCurrentUser(): Promise<IUserInfo> {
        if (!this.userSubject.getValue()) {
            await this.getCurrentUserInfo();
        }
        return this.userSubject.getValue();
    }

    private async getCurrentUserInfo() {
        try {
            const user = await this.http.get<IUserInfo>(this.userAPI, { headers: this.AuthHeader }).toPromise();
            if (user) {
                console.log("получил юзера");
                this.userSubject.next(user);
            }
        } catch (error) {
            // Обработка ошибок при получении информации о пользователе
            console.error("Ошибка при получении информации о пользователе:", error);
            throw error;
        }
    }

    public login(model: LoginModel): Observable<void> {
    // pipe - предобработка данных, полученных с сервака, затем можно буедт эти данные прочекать в subscribe
        return this.http.post<IUserInfo>(this.apiAuth + "login", model).pipe(map((result: IUserInfo) => {
            const token = new TokenResult(result.token, "0");
            this.userSubject.next(result);
            this.tokenSubject.next(token);
        }));
    }

    public register(model: RegisterModel): Observable<void> {
    // pipe - предобработка данных, полученных с сервака, затем можно буедт эти данные прочекать в subscribe
        return this.http.post<IUserInfo>(this.apiAuth + "register", model).pipe(map((result: IUserInfo) => {
            const token = new TokenResult(result.token, "0");
            this.userSubject.next(result);
            this.tokenSubject.next(token);
        }));
    }

    public logout(): void {
    //this.http.post(this.apiAuth + 'logout', null).subscribe();
        this.tokenSubject.next({} as ITokenResult);
    }

    public tryRetrieveAccessToken(): Observable<void> {
        console.log("retr");
        const accessToken = localStorage.getItem("access-token");
        const refreshToken = localStorage.getItem("refresh-token");
        if (accessToken && refreshToken && AuthService.isTokenValid(accessToken)) {
            this.tokenSubject.next({ accessToken: accessToken, refreshToken: refreshToken });
        }
        return EMPTY;
    }

    private updateTokens() {
    // localStorage - хранилище в браузере хранящее информацию до 5мб
        if (!this.authInfo) {
            localStorage.removeItem("access-token");
            localStorage.removeItem("refresh-token");
            return;
        }

        if (this.authInfo && this.authInfo.accessToken && this.authInfo.refreshToken) {
            localStorage.setItem("access-token", this.authInfo.accessToken);
            localStorage.setItem("refresh-token", this.authInfo.refreshToken);
        }
    }

    private decodeJwt(accessToken: string, refreshToken: string) {
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

    changeCredentials(newCreditentials : UserCredentials) {
        return this.http.put<IUserInfo>(this.apiAuth + "user", newCreditentials).pipe(map((result: IUserInfo) => {
            const token = new TokenResult(result.token, "0");
            this.userSubject.next(result);
            this.tokenSubject.next(token);
        }));
    }

}
