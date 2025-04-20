import { ChooseQuestionComponent } from "./choose-question/choose-question.component";
import { environment } from "../../enviroment/enviroment.development";
import { FormBuilder } from "@angular/forms";
import { QuizService } from "../../service/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { BaseComponent } from "../base.component";

export abstract class QuestionCreator extends BaseComponent {

    protected constructor(
        public fb : FormBuilder,
        public quizService : QuizService,
        public router: Router,
        public dialog: MatDialog,
        public route: ActivatedRoute
    ) {
        super();
    }

    protected abstract addQuestion() : void;

    protected abstract onCreateQuizClick() : void;

    protected redirectTo(uri: string) : void {
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate([uri]);
        });
    }

}

