import {Component, inject} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import {UserService} from "../service/user.service";
import {IUserInfo} from "../models/user-info";
import {BaseComponent } from "../components/base.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent extends BaseComponent {

    private currentUserInfo: IUserInfo | null;

    constructor(public readonly userService: UserService) {
        super();
        userService.getCurrentUserInfo().then(user => this.currentUserInfo = user);
    }

}
