import { Routes } from '@angular/router';
import {HomeComponent} from "../components/home/home.component";
import {LoginComponent} from "../components/login/login.component";
import {AuthGuard} from "../guards/auth.guard";
import {AnonimousGuard} from "../guards/anonimous.guard";
import {RegisterUserComponent} from "../components/login/register-user/register-user.component";
import {JoinGameComponent} from "../components/join-game/join-game.component";
import {UserProfileComponent} from "../components/user-profile/user-profile.component";
import {CreateQuizComponent} from "../components/create-quiz/create-quiz.component";
import {SearchQuizComponent} from "../components/search-quiz/search-quiz.component";

const homeRoutes: Routes = [
  { path: 'game', loadComponent: () => JoinGameComponent},
  { path: 'profile', component: UserProfileComponent },
  { path: 'create', component: CreateQuizComponent },
  { path: 'search', component: SearchQuizComponent },
  { path: '', redirectTo: 'game', pathMatch: "full",},
];

export const routes: Routes =
  [  /*{
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
    }
    */
    {
      path: "",
      loadComponent: () => HomeComponent,
      children: homeRoutes,
    }
    ];
