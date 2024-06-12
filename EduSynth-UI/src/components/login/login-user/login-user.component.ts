import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "../../../service/auth.service";
import {LoginModel} from "../../../models/login-model";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login-user',
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
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  public formGroup: FormGroup = new FormGroup(
    {
      "email": new FormControl<string>("",
        [Validators.required, Validators.maxLength(50), Validators.minLength(3)]
      ),
      "password": new FormControl<string>("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)])
    }
  )

  public get email() : FormControl<string> { return this.formGroup.get("email") as FormControl<string> }
  public get password() : FormControl<string> { return this.formGroup.get("password") as FormControl<string> }
  public errorMessage : string = '';
  authService : AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  onLoginClicked() {
    let model = new LoginModel();
    model.populateFromFormGroup(this.formGroup);
      this.errorMessage = '';
      this.authService.login(model).subscribe(      () => {}, // Обработчик успешного выполнения подписки
        (error) => { // Обработчик ошибки
          console.log('not catching');
          this.errorMessage = error.message || 'Произошла ошибка при входе в систему';
        });
  }
}
