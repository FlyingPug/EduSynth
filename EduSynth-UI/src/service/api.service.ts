import { EventEmitter, inject, Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../enviroment/enviroment.development";
import {AuthService} from "./auth.service";

@Injectable({ providedIn: "root" })
export class ApiClient {

    protected readonly apiRoot: string;

    private readonly http = inject(HttpClient);
    private readonly zone = inject(NgZone);
    private readonly router = inject(Router);

    constructor() {
        this.apiRoot = environment.apiUrl;
    }

    public get<TResult = any>(url: string, full: boolean = false, cancellationToken: EventEmitter<void> | null = null): Promise<TResult> {
        const observable = this.http.get(
            this.getUrl(url),
            {
                headers: this.getHeaders(),
                observe: "response",
            }) as any as Observable<HttpResponse<TResult>>;
        return this.subscribe<TResult>(observable, full, cancellationToken);
    }

    public delete(url: string, body: unknown): Promise<any> {
        const observable = this.http.delete(
            this.getUrl(url),
            {
                headers: this.getHeaders(),
                body: JSON.stringify(body),
                observe: "response"
            });
        return this.subscribe(observable);
    }

    public post(url: string, data: unknown): Promise<any> {
        const observable =
          this.http.post(this.getUrl(url),
              JSON.stringify(data),
              {
                  headers: this.getHeaders(),
                  observe: "response"
              });
        return this.subscribe(observable);
    }

    public put(url: string, data?: unknown): Promise<any> {
        const observable =
          this.http.put(this.getUrl(url),
              JSON.stringify(data ?? {}),
              {
                  headers: this.getHeaders(),
                  observe: "response"
              });
        return this.subscribe(observable);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private subscribe<TResult = any>(
        observable: Observable<HttpResponse<TResult>>,
        full: boolean = false,
        cancellationToken: EventEmitter<void> | null = null): Promise<TResult> {
        return new Promise<TResult>((resolve, reject) => {
            let subscription: Subscription | null = observable.subscribe({
                next: r => {
                    setTimeout(() => {
                        this.zone.run(() => {
                            if (full) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                resolve(r as any as TResult);
                            } else {
                                if (!r.body) {
                                    reject(r);
                                }

                                resolve(r.body as TResult);
                            }
                        });
                    });
                },
                error: async r => {
                    if (r.status === 400) {
                        reject(r);
                    }
                    if (r.status === 401) {
                        AuthService.logout();
                        await this.router.navigate(["auth/login"]);
                        reject(r);
                        return;
                    }
                    if (r.status === 402) {
                        reject(r);
                        return;
                    }
                    reject(r);
                }
            });

            cancellationToken?.subscribe(() => {
                subscription?.unsubscribe();
                subscription = null;
            });
        });
    }

    private getHeaders(): HttpHeaders {
        const jwtToken = localStorage.getItem("access-token");

        return new HttpHeaders({
            "content-type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
            "cache-control": "no-cache",
        });
    }

    private getUrl(urlPart: string): string {
        return this.apiRoot + urlPart;
    }

}
