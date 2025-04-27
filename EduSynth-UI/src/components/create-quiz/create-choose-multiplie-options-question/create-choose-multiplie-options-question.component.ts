import { Component, OnInit } from "@angular/core";
import { slideToLeftAnimation } from "../../../animations/slide-to-left";
import { ImageUploadComponent } from "../../image-upload/image-upload.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { QuizService } from "../../../service/quiz.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { QuestionCreator } from "../question-creator";
import { QuizRequestDto } from "../../../models/quiz/request/quiz-request-model";
import { ChooseQuestionComponent } from "../choose-question/choose-question.component";
import { QuestionTypeDto } from "../../../models/quiz/question-type-model";
import { MultipleChoiceQuestionRequestDto } from "../../../models/quiz/request/multiple-choice-question-request-model";

@Component({
    selector: "app-create-choose-multiplie-options-question",
    standalone: true,
    imports: [CommonModule, FormsModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        ImageUploadComponent, MatCheckbox, MatIconModule,
        MatRadioModule],
    templateUrl: "./create-choose-multiplie-options-question.component.html",
    styleUrl: "./create-choose-multiplie-options-question.component.scss",
    animations: [slideToLeftAnimation]
})
export class CreateChooseMultiplieOptionsQuestionComponent extends QuestionCreator implements OnInit {

    public form = this.fb.group({
        "questionText": new FormControl<string>("",
            [Validators.required, Validators.maxLength(364), Validators.minLength(1)]),
        "timeLimit": new FormControl<number>(60, [Validators.min(5)]),
        answers: this.fb.array([])
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

    private quizRequest: QuizRequestDto;

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

        this.addAnswer();
    }

    public override addQuestion(): void {
        const dialogRef = this.dialog.open(ChooseQuestionComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.addQuestionToRequest();

            if (result in QuestionTypeDto){
                this.router.navigate(["../" + result], {
                    relativeTo: this.route,
                    state:{ quizRequest: this.quizRequest }
                });
            }
        });

    }

    public override async onCreateQuizClick(): Promise<void> {
        this.addQuestionToRequest();
        const quiz = new QuizRequestDto(this.quizRequest);
        const quizResponse = await this.quizService.createQuiz(quiz);

        this.router.navigate(["quiz/" + quizResponse.id], {
            state:{ quizRequest: this.quizRequest }
        });
    }

    private addQuestionToRequest(): void {
        const answersArray = this.answers.controls.map(control => {
            return { mediaUrl: "", text: control.get("text")?.value, correct: control.get("isTrue")?.value };
        });

        this.quizRequest.questions.push(new MultipleChoiceQuestionRequestDto({
            text: this.questionText?.value,
            mediaUrl: this.questionImageUrl,
            questionType: QuestionTypeDto.MULTIPLE,
            timeLimitSeconds: this.timeLimit?.value,
            answers: answersArray,
        }));
    }

    public addAnswer(): void {
        if (this.answers.length < 6) {
            const answerForm = this.fb.group({
                text: ["", [ Validators.required, Validators.minLength(1)]],
                isTrue: [false]
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
