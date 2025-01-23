import { inject, Injectable } from "@angular/core";
import { IUserInfo } from "../models/user-info";
import { ApiClient } from "./api.service";

@Injectable({ providedIn: "root" })
export class UserService {

    private apiClient = inject(ApiClient);

    private userAPI: string = "/public/user";

    public async getCurrentUserInfo(): Promise<IUserInfo> {
        return await this.apiClient.get<IUserInfo>(this.userAPI);
    }

}
