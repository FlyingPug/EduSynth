import { Routes } from '@angular/router';
import {HomeComponent} from "../components/home/home.component";
import {LoginComponent} from "../components/login/login.component";
import {AuthGuard} from "../guards/auth.guard";
import {AnonimousGuard} from "../guards/anonimous.guard";

export const routes: Routes =
  [  {
    path: "",
    pathMatch: "full",
    loadComponent: () => HomeComponent,
    canMatch: [AuthGuard]
    },
    {
      path: "auth/login",
      pathMatch: "full",
      loadComponent: () => LoginComponent,
      canMatch: [AnonimousGuard]
    }];
