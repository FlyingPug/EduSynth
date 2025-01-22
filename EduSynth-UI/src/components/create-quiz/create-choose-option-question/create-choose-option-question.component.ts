import { Component, EventEmitter, Output, OnInit } from "@angular/core";
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
import { QuestionType } from "../../../models/enums/question-type";

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

    @Output() public questionCreated: EventEmitter<any> = new EventEmitter<any>();

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
        return this.form.get("questionText") as FormControl<string>;
    }

    public get timeLimit(): FormControl<number> {
        return this.form.get("timeLimit") as FormControl<number>;
    }

    public get trueIndex(): FormControl<number> {
        return this.form.get("trueIndex") as FormControl<number>;
    }

    constructor(fb: FormBuilder, quizService: QuizService, router: Router, dialog: MatDialog, route: ActivatedRoute) {
        super(fb, quizService, router, dialog, route); // Вызов конструктора родительского класса с помощью super
    }

    public ngOnInit(): void {
        this.addAnswer();
    }

    public override addQuestion(): void {
        const trueIndex = this.trueIndex?.value;
        const answersArray = this.answers.controls.map((control, index) => {
            return { id: 0, mediaUrl: "", text: control.get("text")?.value, correct: index == trueIndex };
        });

        this.quizService.addQuestion(
            {
                id: 0,
                text: this.questionText?.value,
                mediaUrl: this.questionImageUrl,
                type: QuestionType.SingleOption,
                timeLimitSeconds: this.timeLimit?.value,
                answers: answersArray,
            }
        );
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
