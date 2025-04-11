import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { UserService } from "../service/user.service";
import { BaseComponent } from "../components/base.component";
import { IUser } from "../models/user/user-model";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent extends BaseComponent {

    private currentUserInfo: IUser | null;

    constructor(public readonly userService: UserService) {
        super();
        userService.getCurrentUserInfo().then(user => this.currentUserInfo = user);
    }

}
