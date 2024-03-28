import { Injectable } from '@angular/core';
import {AuthInfo} from "../models/auth.info";
import {environment} from "../enviroment/enviroment.development";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ITokenResult} from "../models/token-result";
import {BehaviorSubject, EMPTY, map, Observable} from "rxjs";
import {LoginModel} from "../models/login-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authInfo: AuthInfo | null = null;
  private apiAuth: string = environment.apiUrl + '/public/auth/';
  private tokenSubject: BehaviorSubject<ITokenResult>;
  private isInitialized: Boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {
    // наблюдаемый субъект, отличие BehaviorSubject от Subject в том, что BehaivourSubject имеет начальное значение
    // , он всегда кидает какое-то актуальное состояние
    this.tokenSubject = new BehaviorSubject<ITokenResult>({} as ITokenResult);

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

      if (isNewSession) {
        //this.startRefreshTokenTimer();
        // если мы сейчас на странице логина/регистрации переходим на главную
        if (this.router.routerState.snapshot.url.indexOf('/auth/') === 0) {
          this.router.navigate(["/"]);
        }
      }
    });
  }

  public get isAuthorized(): boolean {
    return !!this.authInfo?.accessToken;
  }

  public login(model: LoginModel): Observable<void> {
    // pipe - предобработка данных, полученных с сервака, затем можно буедт эти данные прочекать в subscribe
    return this.http.post<ITokenResult>(this.apiAuth + "login", JSON.stringify(model)).pipe(map((result: ITokenResult) => {
      this.tokenSubject.next(result);
    }));
  }

  public logout(): void {
    //this.http.post(this.apiAuth + 'logout', null).subscribe();
    this.tokenSubject.next({} as ITokenResult);
  }

  public tryRetrieveAccessToken(): Observable<void> {
    const accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    if (accessToken && refreshToken) {
      this.tokenSubject.next({ accessToken: accessToken, refreshToken: refreshToken });
    }
    return EMPTY;
  }

  private updateTokens() {
    // localStorage - хранилище в браузере хранящее инфорамцию до 5мб
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
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = window.atob(base64);
    const payload = JSON.parse(json);

    return new AuthInfo(accessToken, refreshToken, payload.id, payload.exp);
  }
}
