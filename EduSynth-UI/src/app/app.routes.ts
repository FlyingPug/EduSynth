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
import {ImageUploadComponent} from "../components/image-upload/image-upload.component";
import {environment} from "../enviroment/enviroment.development";
import {
  CreateInputTextQuestionComponent
} from "../components/create-quiz/create-input-text-question/create-input-text-question.component";
import {
  CreateChooseMultiplieOptionsQuestionComponent
} from "../components/create-quiz/create-choose-multiplie-options-question/create-choose-multiplie-options-question.component";
import {
  CreateChooseOptionQuestionComponent
} from "../components/create-quiz/create-choose-option-question/create-choose-option-question.component";
import {DisplayQuizDetailsComponent} from "../components/display-quiz-details/display-quiz-details.component";

const homeRoutes: Routes = [
  { path: 'game', loadComponent: () => JoinGameComponent},
  { path: 'profile', component: UserProfileComponent },
  { path: 'create', component: CreateQuizComponent },
  { path: 'quiz/:id', component: DisplayQuizDetailsComponent },
  { path: environment.input_text, component: CreateInputTextQuestionComponent },
  { path: environment.choose_mult_options, component: CreateChooseMultiplieOptionsQuestionComponent },
  { path: environment.choose_option, component: CreateChooseOptionQuestionComponent },
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
