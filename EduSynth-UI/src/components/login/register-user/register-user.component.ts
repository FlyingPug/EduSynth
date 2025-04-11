import { Component } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { ErrorStateMatcher, MatOptionModule } from "@angular/material/core";
import { RegisterModel } from "../../../models/user/register-model";
import { AuthService } from "../../../service/auth.service";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";

export class MyErrorStateMatcher implements ErrorStateMatcher {

    public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

}

@Component({
    selector: "app-register-user",
    standalone: true,
    imports: [MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatOptionModule],
    templateUrl: "./register-user.component.html",
    styleUrl: "./register-user.component.css"
})
export class RegisterUserComponent {

    public formGroup: FormGroup = new FormGroup(
        {
            "name": new FormControl<string>("",
                [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
            ),
            "email": new FormControl<string>("",
                [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
            ),
            "password": new FormControl<string>("",
                [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
            ),
            "role": new FormControl<string>("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)])
        }
    );

    public get name() : FormControl<string> { return this.formGroup.get("name") as FormControl<string>; }
    public get role() : FormControl<string> { return this.formGroup.get("role") as FormControl<string>; }
    public get email() : FormControl<string> { return this.formGroup.get("email") as FormControl<string>; }
    public get password() : FormControl<string> { return this.formGroup.get("password") as FormControl<string>; }

    constructor(private readonly authService: AuthService ) {
    }

    public matcher = new MyErrorStateMatcher();

    public onRegisterClicked(): void {
        const model = this.createRegisterModel();
        this.authService.register(model).subscribe();
    }

    private createRegisterModel(): RegisterModel {
        const model = new RegisterModel();
        model.email = this.formGroup.get("email")?.value;
        model.password = this.formGroup.get("password")?.value;
        model.role = this.formGroup.get("role")?.value;
        model.name = this.formGroup.get("name")?.value;
        return model;
    }

}
