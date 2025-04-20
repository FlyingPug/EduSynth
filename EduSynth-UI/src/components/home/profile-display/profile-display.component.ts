import { Component } from "@angular/core";
import { UserService } from "../../../service/user.service";
import { IUser } from "../../../models/user/user-model";

@Component({
    selector: "app-profile-display",
    standalone: true,
    imports: [],
    templateUrl: "./profile-display.component.html",
    styleUrl: "./profile-display.component.css"
})
export class ProfileDisplayComponent {

    public myUser : Promise<IUser>;

    private profilePictureUrl: string = "/assets/images/profile_pic.png";
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
