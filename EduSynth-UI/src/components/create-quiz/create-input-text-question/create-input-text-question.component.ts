import { Component } from "@angular/core";
import { slideToLeftAnimation } from "../../../animations/slide-to-left";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ImageUploadComponent } from "../../image-upload/image-upload.component";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { QuizService } from "../../../service/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { QuestionCreator } from "../question-creator";
import { QuestionType } from "../../../models/enums/question-type";

@Component({
    selector: "app-create-input-text-question",
    standalone: true,
    imports: [
        ImageUploadComponent,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    templateUrl: "./create-input-text-question.component.html",
    styleUrl: "./create-input-text-question.component.css",
    animations: [slideToLeftAnimation]
})
export class CreateInputTextQuestionComponent extends QuestionCreator {

    public questionImageUrl: string = "";

    public form = this.fb.group({
        "questionText": new FormControl<string>("",
            [Validators.required, Validators.maxLength(364), Validators.minLength(1)]),
        "timeLimit": new FormControl<number>(60, [Validators.min(5)]),
        "answer": new FormControl<string>("", [Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
    });

    public get questionText(): FormControl<string> {
        return this.form.get("questionText") as FormControl<string>;
    }

    public get timeLimit(): FormControl<number> {
        return this.form.get("timeLimit") as FormControl<number>;
    }

    public get answer(): FormControl<string> {
        return this.form.get("answer") as FormControl<string>;
    }

    constructor(fb: FormBuilder, quizService: QuizService, router: Router, dialog: MatDialog, route: ActivatedRoute) {
        super(fb, quizService, router, dialog, route);
    }

    public onTitleImageUrlGet($event: string): void {
        this.questionImageUrl = $event;
    }

    public override addQuestion(): void {
        const answer = this.answer?.value;
        this.quizService.addQuestion(
            {
                id: 0,
                text: this.questionText?.value,
                mediaUrl: this.questionImageUrl,
                type: QuestionType.InputAnswer,
                timeLimitSeconds: this.timeLimit?.value,
                answers: [{ id: 0, text: answer, mediaUrl:"", correct: true }],
            }
        );
    }

}
