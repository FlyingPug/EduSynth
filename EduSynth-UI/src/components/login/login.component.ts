import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {RegisterUserComponent} from "./register-user/register-user.component";
import {LoginUserComponent} from "./login-user/login-user.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  RegisterUserComponent,
  LoginUserComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
