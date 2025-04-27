import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { QuestionCreator } from "../question-creator";
import { ChronoEventComponent } from "./chrono-event/chrono-event.component";
import { ImageUploadComponent } from "../../image-upload/image-upload.component";
import { slideToLeftAnimation } from "../../../animations/slide-to-left";
import { IQuizRequestDto, QuizRequestDto } from "../../../models/quiz/request/quiz-request-model";
import { QuizService } from "../../../service/quiz.service";
import { ChooseQuestionComponent } from "../choose-question/choose-question.component";
import { QuestionTypeDto } from "../../../models/quiz/question-type-model";
import { ChronoOrderQuestionRequestDto } from "../../../models/quiz/request/chrono-order-question-request-model";

@Component({
    selector: "app-create-chrono-question",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ImageUploadComponent,
        DragDropModule,
        ChronoEventComponent
    ],
    templateUrl: "./create-chrono-question.component.html",
    styleUrl: "./create-chrono-question.component.scss",
    animations: [slideToLeftAnimation]
})
export class CreateChronoQuestionComponent extends QuestionCreator implements OnInit {

    public readonly form: FormGroup = new FormGroup({
        questionText: new FormControl<string>("", [
            Validators.required,
            Validators.maxLength(350),
            Validators.minLength(5)
        ]),
        timeLimit: new FormControl<number>(120, [
            Validators.min(120)
        ]),
        events: new FormArray<FormGroup>([])
    });

    public questionImageUrl: string = "";

    public get events(): FormArray<FormGroup> {
        return this.getFormArray(this.form, "events");
    }

    public get questionText(): FormControl<string> {
        return this.getFormControl(this.form, "questionText");
    }

    public get timeLimit(): FormControl<number> {
        return this.getFormControl(this.form, "timeLimit");
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

        // Добавляем минимум 3 события для хронологического порядка
        this.addEvent();
        this.addEvent();
        this.addEvent();
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
        const eventsArray = this.events.controls.map((control, index) => {
            return {
                text: control.get("text")?.value,
                orderIndex: index
            };
        });

        this.quizRequest.questions.push(new ChronoOrderQuestionRequestDto({
            text: this.questionText?.value,
            mediaUrl: this.questionImageUrl,
            questionType: QuestionTypeDto.CHRONO,
            timeLimitSeconds: this.timeLimit?.value,
            events: eventsArray,
        }));
    }

    public addEvent(): void {
        if (this.events.length < 10) { // Ограничиваем максимальное количество событий
            const eventForm = this.fb.group({
                text: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]]
            });

            this.events.push(eventForm);
        }
    }

    public removeEvent(index: number): void {
        if (this.events.length > 3) { // Минимум 3 события должно быть
            this.events.removeAt(index);
        }
    }

    public onTitleImageUrlGet($event: string): void {
        this.questionImageUrl = $event;
    }

    // Обработка перетаскивания для изменения порядка событий
    public dropEvent(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.events.controls, event.previousIndex, event.currentIndex);
    }

}