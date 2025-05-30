import { Component, inject } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../../service/auth.service";
import { LoginModel } from "../../../models/user/login-model";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
    selector: "app-login-user",
    standalone: true,
    imports: [
        MatTabsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: "./login-user.component.html",
    styleUrl: "./login-user.component.css"
})
export class LoginUserComponent {

    public formGroup: FormGroup = new FormGroup(
        {
            "email": new FormControl<string>("",
                [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
            ),
            "password": new FormControl<string>("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)])
        }
    );

    public get email() : FormControl<string> { return this.formGroup.get("email") as FormControl<string>; }
    public get password() : FormControl<string> { return this.formGroup.get("password") as FormControl<string>; }

    public errorMessage : string = "";

    private authService = inject(AuthService);
    private router = inject(Router);

    public async onLoginClicked(): Promise<void> {
        const model = this.createLoginModel();
        this.errorMessage = "";
        try {
            await this.authService.login(model);
            this.router.navigate(["/game"]);
        } catch(error: any) {
            if (error.status === 401) {
                this.errorMessage = "Неправильный логин или пароль";
            } else {
                this.errorMessage = error.message || "Произошла ошибка при входе в систему";
            }
        }
    }

    private createLoginModel(): LoginModel {
        const model = new LoginModel();
        model.email = this.formGroup.get("email")?.value;
        model.password = this.formGroup.get("password")?.value;
        return model;
    }

}
