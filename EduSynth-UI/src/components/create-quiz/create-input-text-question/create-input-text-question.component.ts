import { Component } from "@angular/core";
import { slideToLeftAnimation } from "../../../animations/slide-to-left";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ImageUploadComponent } from "../../image-upload/image-upload.component";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { QuizService } from "../../../service/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { QuestionCreator } from "../question-creator";
import { QuestionTypeDto } from "../../../models/quiz/question-type-model";
import { TextInputQuestionRequestDto } from "../../../models/quiz/request/text-input-question-request-model";
import { IQuizRequestDto, QuizRequestDto } from "../../../models/quiz/request/quiz-request-model";
import { ChooseQuestionComponent } from "../choose-question/choose-question.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-create-input-text-question",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        ImageUploadComponent,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    templateUrl: "./create-input-text-question.component.html",
    styleUrl: "./create-input-text-question.component.scss",
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

    private quizRequest: IQuizRequestDto;

    constructor(fb: FormBuilder, quizService: QuizService, router: Router, dialog: MatDialog, route: ActivatedRoute) {
        super(fb, quizService, router, dialog, route);
    }

    public ngOnInit(): void {
        this.quizRequest = history.state?.quizRequest;

        if (!this.quizRequest) {
            this.router.navigate(["../"], {
                relativeTo: this.route
            });
        }
    }

    public onTitleImageUrlGet($event: string): void {
        this.questionImageUrl = $event;
    }

    public override addQuestion(): void {
        const dialogRef = this.dialog.open(ChooseQuestionComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.addQuestionToQuiz();

            if (result in QuestionTypeDto){
                this.router.navigate(["../" + result], {
                    relativeTo: this.route,
                    state:{ quizRequest: this.quizRequest }
                });
            }
        });
    }

    public override async onCreateQuizClick(): Promise<void> {
        this.addQuestionToQuiz();
        const quiz = new QuizRequestDto(this.quizRequest);
        const quizResponse = await this.quizService.createQuiz(quiz);

        this.router.navigate(["quiz/" + quizResponse.id], {
            state:{ quizRequest: this.quizRequest }
        });
    }

    private addQuestionToQuiz(): void {
        const answer = this.answer?.value;

        this.quizRequest.questions.push(new TextInputQuestionRequestDto({
            text: this.questionText?.value,
            mediaUrl: this.questionImageUrl,
            questionType: QuestionTypeDto.INPUT_TEXT,
            timeLimitSeconds: this.timeLimit?.value,
            correctAnswer: answer,
        }));
    }

}
