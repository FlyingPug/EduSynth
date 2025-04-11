import { Component, OnInit } from "@angular/core";
import { slideToLeftAnimation } from "../../../animations/slide-to-left";
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ImageUploadComponent } from "../../image-upload/image-upload.component";
import { MatIconModule } from "@angular/material/icon";
import { QuizService } from "../../../service/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { QuestionCreator } from "../question-creator";
import { SingleChoiceQuestionRequestDto } from "../../../models/quiz/request/single-choise-question-request-model";
import { QuestionTypeDto } from "../../../models/quiz/question-type-model";
import { ChooseQuestionComponent } from "../choose-question/choose-question.component";
import { QuizRequestDto } from "../../../models/quiz/request/quiz-request-model";

@Component({
    selector: "app-create-choose-option-question",
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        ImageUploadComponent, MatIconModule,
        MatRadioModule],
    templateUrl: "./create-choose-option-question.component.html",
    styleUrl: "./create-choose-option-question.component.css",
    animations: [slideToLeftAnimation],
})
export class CreateChooseOptionQuestionComponent extends QuestionCreator implements OnInit {

    public form = this.fb.group({
        "questionText": new FormControl<string>("",
            [Validators.required, Validators.maxLength(364), Validators.minLength(1)]),
        "timeLimit": new FormControl<number>(60, [Validators.min(5)]),
        answers: this.fb.array([]),
        "trueIndex": new FormControl<number>(0),
    });

    public questionImageUrl: string = "";

    public get answers(): FormArray {
        return this.form.controls.answers as FormArray;
    }

    public get questionText(): FormControl<string> {
        return this.getFormControl(this.form, "questionText");
    }

    public get timeLimit(): FormControl<number> {
        return this.getFormControl(this.form, "timeLimit");
    }

    public get trueIndex(): FormControl<number> {
        return this.getFormControl(this.form, "trueIndex");
    }

    private quizRequest: QuizRequestDto;

    constructor(fb: FormBuilder, quizService: QuizService, router: Router, dialog: MatDialog, route: ActivatedRoute) {
        super(fb, quizService, router, dialog, route);
    }

    public ngOnInit(): void {
        this.quizRequest = history.state?.data;

        if (!this.quizRequest) {
            this.router.navigate(["../"], {
                relativeTo: this.route
            });
        }

        this.addAnswer();
    }

    public override addQuestion(): void {
        const trueIndex = this.trueIndex?.value;
        const answersArray = this.answers.controls.map((control, index) => {
            return { mediaUrl: "", text: control.get("text")?.value, isCorrect: index == trueIndex };
        });

        const dialogRef = this.dialog.open(ChooseQuestionComponent);

        dialogRef.afterClosed().subscribe(result => {

            this.quizRequest.questions.push(new SingleChoiceQuestionRequestDto({
                text: this.questionText?.value,
                mediaUrl: this.questionImageUrl,
                questionType: QuestionTypeDto.CHOOSE_MULTIPLE_OPTIONS,
                timeLimitSeconds: this.timeLimit?.value,
                answers: answersArray,
            }));

            if (result in QuestionTypeDto){
                this.router.navigate(["../" + result], {
                    relativeTo: this.route,
                    state:{ quizRequest: this.quizRequest }
                });
            }
        });
    }

    public override async onCreateQuizClick(): Promise<void> {
        const quiz = await this.quizService.createQuiz(this.quizRequest);

        this.router.navigate(["quiz/" + quiz.id], {
            relativeTo: this.route,
            state:{ quizRequest: this.quizRequest }
        });
    }

    public addAnswer(): void {
        if (this.answers.length < 6) {
            const answerForm = this.fb.group({
                text: ["", [ Validators.required, Validators.minLength(1)]]
            });

            this.answers.push(answerForm);
        }
    }

    public removeAnswer(index: number): void {
        if (this.answers.length > 1) {
            this.answers.removeAt(index);
        }
    }

    public onTitleImageUrlGet($event: string): void {
        this.questionImageUrl = $event;
    }

}
