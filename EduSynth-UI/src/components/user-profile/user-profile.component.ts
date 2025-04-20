import { Component, inject, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { AuthService } from "../../service/auth.service";
import { UserCredentials } from "../../models/user/UserCredentials";
import { UserService } from "../../service/user.service";

@Component({
    selector: "app-user-profile",
    standalone: true,
    imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, ImageUploadComponent],
    templateUrl: "./user-profile.component.html",
    styleUrl: "./user-profile.component.scss"
})
export class UserProfileComponent implements OnInit {

    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);

    public formGroup: FormGroup = new FormGroup(
        {
            "oldPassword": new FormControl<string>("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
            "newPassword": new FormControl<string>("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)])
        }
    );

    public get oldPassword() : FormControl<string> { return this.formGroup.get("oldPassword") as FormControl<string>; }
    public get newPassword() : FormControl<string> { return this.formGroup.get("newPassword") as FormControl<string>; }

    public imageSrc = "/assets/images/profile_pic.png";
    public username = "";

    public async ngOnInit(): Promise<void> {
        const user = await this.userService.getCurrentUserInfo();
        if (user.profilePictureUrl) {
            this.imageSrc = user.profilePictureUrl;
        }

        this.username = user.username;
    }

    public async saveInfo(): Promise<void> {
        const oldPassword = this.formGroup.get("oldPassword")?.value;
        const newPassword = this.formGroup.get("newPassword")?.value;
        const userCredentials = new UserCredentials(oldPassword, newPassword, this.imageSrc);

        this.authService.changeCredentials(userCredentials);
    }

    public onTitleImageUrlGet($event: string): void {
        this.imageSrc = $event;
    }

}
