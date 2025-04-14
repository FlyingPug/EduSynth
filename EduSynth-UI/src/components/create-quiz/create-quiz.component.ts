import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ChooseQuestionComponent } from "./choose-question/choose-question.component";
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { slideToLeftAnimation } from "../../animations/slide-to-left";
import { IQuizRequestDto } from "../../models/quiz/request/quiz-request-model";
import { QuestionTypeDto } from "../../models/quiz/question-type-model";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
    selector: "app-create-quiz",
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatCheckbox, ImageUploadComponent],
    templateUrl: "./create-quiz.component.html",
    styleUrl: "./create-quiz.component.scss",
    animations: [slideToLeftAnimation]
})
export class CreateQuizComponent {

    private dialog: MatDialog = inject(MatDialog);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    public formGroup: FormGroup = new FormGroup(
        {
            "name": new FormControl<string>("",
                [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),
            "description": new FormControl<string>("",
                [Validators.maxLength(500)]),
            "isPublic": new FormControl<boolean>(true)
        });

    public get name() : FormControl<string> { return this.formGroup.get("name") as FormControl<string>; }
    public get description() : FormControl<string> { return this.formGroup.get("description") as FormControl<string>; }
    public get isPublic() : FormControl<boolean> { return this.formGroup.get("isPublic") as FormControl<boolean>; }

    public onTitleImageUrlGet(imageUrl : string): void {
        this.imageUrl = imageUrl;
    }

    private imageUrl: string = "";

    public onCreateQuizClick(): void {
        const quizRequest = this.createQuizRequest();
        const dialogRef = this.dialog.open(ChooseQuestionComponent);

        dialogRef.afterClosed().subscribe(async result => {
            if (Object.values(QuestionTypeDto).includes(result as QuestionTypeDto)){
                await this.router.navigate([result], {
                    state:{ quizRequest: quizRequest }
                });
            }
        });
    }

    private createQuizRequest(): IQuizRequestDto {
        return {
            title: this.formGroup.get("name")?.value,
            description: this.formGroup.get("description")?.value,
            isPublic: this.formGroup.get("isPublic")?.value,
            titleMediaUrl: this.imageUrl,
            questions: []
        };
    }

}
