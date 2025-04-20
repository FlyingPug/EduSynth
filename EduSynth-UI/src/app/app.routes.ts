import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { LoginComponent } from "../components/login/login.component";
import { AuthGuard } from "../guards/auth.guard";
import { AnonimousGuard } from "../guards/anonimous.guard";
import { JoinGameComponent } from "../components/join-game/join-game.component";
import { UserProfileComponent } from "../components/user-profile/user-profile.component";
import { CreateQuizComponent } from "../components/create-quiz/create-quiz.component";
import { SearchQuizComponent } from "../components/search-quiz/search-quiz.component";
import { environment } from "../enviroment/enviroment.development";
import {
    CreateInputTextQuestionComponent
} from "../components/create-quiz/create-input-text-question/create-input-text-question.component";
import {
    CreateChooseMultiplieOptionsQuestionComponent
} from "../components/create-quiz/create-choose-multiplie-options-question/create-choose-multiplie-options-question.component";
import {
    CreateChooseOptionQuestionComponent
} from "../components/create-quiz/create-choose-option-question/create-choose-option-question.component";
import { DisplayQuizDetailsComponent } from "../components/display-quiz-details/display-quiz-details.component";
import { ResultComponent } from "../components/session/result/result.component";
import { SessionComponent } from "../components/session/session.component";
import { QuestionTypeDto } from "../models/quiz/question-type-model";

const testRoutes: Routes = [
    { path: "", component: CreateChooseMultiplieOptionsQuestionComponent },
];

const homeRoutes: Routes = [
//  { path: '', loadComponent: () => LobbyComponent},
    { path: "game", loadComponent: () => JoinGameComponent },
    { path: "profile", component: UserProfileComponent },
    { path: "create", component: CreateQuizComponent },
    { path: "quiz/:id", component: DisplayQuizDetailsComponent },
    { path: "session/:code", component: SessionComponent },
    { path: "question/choose_option", component: CreateChooseOptionQuestionComponent },
    { path: "question/choose_mult_options", component: CreateChooseMultiplieOptionsQuestionComponent },
    { path: "question/input_text", component: CreateInputTextQuestionComponent },
    { path: "result/:code", component: ResultComponent },
    { path: QuestionTypeDto.INPUT_TEXT, component: CreateInputTextQuestionComponent },
    { path: QuestionTypeDto.MULTIPLE, component: CreateChooseMultiplieOptionsQuestionComponent },
    { path: QuestionTypeDto.CHOOSE_OPTION, component: CreateChooseOptionQuestionComponent },
    { path: QuestionTypeDto.CROSSWORD, component: CreateChooseMultiplieOptionsQuestionComponent },
    { path: QuestionTypeDto.CHRONO, component: CreateChooseOptionQuestionComponent },
    { path: "search", component: SearchQuizComponent },
    { path: "", redirectTo: "game", pathMatch: "full", },
];

export const routes: Routes =
[{
    path: "auth/login",
    pathMatch:"full",
    loadComponent: () => LoginComponent,
    canMatch: [AnonimousGuard]
},
{
    path: "",
    loadComponent: () => HomeComponent,
    children: homeRoutes,
    canMatch: [AuthGuard],
},
    /*
    {
      path: "",
      loadComponent: () => HomeComponent,
      children: testRoutes
    }*/
];
