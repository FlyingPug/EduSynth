import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class ConfigService {

    private http = inject(HttpClient);

    private config: IConfig;

    public get apiRoot(): string { return this.config?.apiRoot ?? ""; }

    public async loadConfig(): Promise<IConfig> {
        this.config = await lastValueFrom(this.http.get<IConfig>("/assets/config.json"));
        return this.config;
    }

}

export interface IConfig {
  apiRoot: string
}
