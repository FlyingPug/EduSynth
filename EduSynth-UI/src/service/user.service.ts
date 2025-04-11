import { inject, Injectable } from "@angular/core";
import { ApiClient } from "./api.service";
import { User } from "../models/user/user-model";

@Injectable({ providedIn: "root" })
export class UserService {

    private apiClient = inject(ApiClient);

    private userAPI: string = "/public/user";

    public async getCurrentUserInfo(): Promise<User> {
        return await this.apiClient.get<User>(this.userAPI);
    }

}
