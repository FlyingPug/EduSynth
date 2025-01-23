import { Component, Input } from "@angular/core";
import { IUserInfo } from "../../../models/user-info";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";
import {UserService} from "../../../service/user.service";

@Component({
    selector: "app-profile-display",
    standalone: true,
    imports: [],
    templateUrl: "./profile-display.component.html",
    styleUrl: "./profile-display.component.css"
})
export class ProfileDisplayComponent {

    public myUser : Promise<IUserInfo>;

    private profilePictureUrl : string = "/assets/images/profile_pic.png";
    public name : string = "User";
    public balance : number = 0;

    public get profilePicture() : string {
        if (this.profilePictureUrl && this.profilePictureUrl.length > 1) return this.profilePictureUrl;
        return "/assets/images/profile_pic.png";
    }

    constructor(private userService: UserService) {
        this.myUser = this.userService.getCurrentUserInfo();
        this.myUser.then(newUser => {
            this.profilePictureUrl = newUser.profilePictureUrl;
            this.name = newUser.username;
            this.balance = newUser.balance;
        });
    }

}
