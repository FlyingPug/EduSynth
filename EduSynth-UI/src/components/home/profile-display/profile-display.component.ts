import { Component, Input } from "@angular/core";
import { IUserInfo } from "../../../models/user-info";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";

@Component({
    selector: "app-profile-display",
    standalone: true,
    imports: [],
    templateUrl: "./profile-display.component.html",
    styleUrl: "./profile-display.component.css"
})
export class ProfileDisplayComponent {

    public myUser : BehaviorSubject<IUserInfo>;

    private profilePictureUrl : string = "/assets/images/profile_pic.png";
    public name : string = "User";
    public balance : number = 0;

    public get profilePicture() : string {
        if (this.profilePictureUrl && this.profilePictureUrl.length > 1) return this.profilePictureUrl;
        return "/assets/images/profile_pic.png";
    }

    constructor(private authService: AuthService) {
        this.myUser = this.authService.userSubject;
        this.myUser.subscribe(newUser => {
            console.log("changeing", newUser);
            this.profilePictureUrl = newUser.profilePictureUrl;
            this.name = newUser.username;
            this.balance = newUser.balance;
        });
    }

}
