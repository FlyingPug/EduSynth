import { ChooseQuestionComponent } from "./choose-question/choose-question.component";
import { environment } from "../../enviroment/enviroment.development";
import { FormBuilder } from "@angular/forms";
import { QuizService } from "../../service/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

export abstract class QuestionCreator {

    protected constructor(public fb : FormBuilder, public quizService : QuizService, public router: Router, public dialog: MatDialog, public route: ActivatedRoute) {
    }

    protected abstract addQuestion() : void;

    protected redirectTo(uri: string) : void {
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate([uri]);
        });
    }

    protected submitQuestion() : void {
        this.addQuestion();
        const dialogRef = this.dialog.open(ChooseQuestionComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result === environment.choose_option || result === environment.choose_mult_options || result === environment.input_text) {
                // this.router.navigate(["../" + result], { relativeTo: this.route });
                this.redirectTo("../" + result);
            }
        });
    }

    public onCreateQuizClick() : void {
        this.addQuestion();
        this.quizService.finishQuizCreation();
    }

}

