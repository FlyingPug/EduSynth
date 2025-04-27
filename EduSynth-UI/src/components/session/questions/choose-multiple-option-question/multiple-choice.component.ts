/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MultipleChoiceQuestionResponseDto } from "../../../../models/quiz/response/multiple-choise-question-request-model";
import { BaseQuestionComponent } from "../base-question.component";
import { CircleCountdownModule } from "ng-circle-countdown";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { CircleTimerComponent } from "../../../circle-timer/circle-timer.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-multiple-choice-question",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatCheckboxModule,
        MatButtonModule,
        CircleCountdownModule,
        MatProgressSpinnerModule,
        MatCardModule,
        CircleTimerComponent,
        MatIconModule
    ],
    templateUrl: "./multiple-choice.component.html",
    styleUrls: ["./multiple-choice.component.scss"]
})
export class MultipleChoiceComponent extends BaseQuestionComponent<MultipleChoiceQuestionResponseDto> implements OnInit {

    @ViewChild("timer") public timer: CircleTimerComponent;

    public selectedAnswers: number[] = [];
    public timeRemaining = 0;
    public timeWarning = false;

    public ngOnInit(): void {
        this.timeLimitSeconds = this.question.timeLimitSeconds || 30;
        this.timeRemaining = this.timeLimitSeconds;
        this.initializeForm();
    }

    protected initializeForm(): void {
        this.form = new FormGroup({
            answers: new FormArray([])
        });
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.timer.start();
        }, 100);
    }

    public onTimerComplete(): void {
        // Автоматически отправляем ответ при истечении времени
        this.submit();
    }

    public onTimerTick(seconds: number): void {
        this.timeRemaining = seconds;

        // Можно добавить дополнительную логику для предупреждений
        if (seconds <= 10 && !this.timeWarning) {
            this.timeWarning = true;
            // Здесь можно добавить звуковое предупреждение или другую логику
        }
    }

    public isSelected(answerId: number): boolean {
        return this.selectedAnswers.includes(answerId);
    }

    public toggleAnswer(answerId: number): void {
        const index = this.selectedAnswers.indexOf(answerId);
        
        if (index === -1) {
            // Добавляем ответ
            this.selectedAnswers.push(answerId);
        } else {
            // Удаляем ответ
            this.selectedAnswers.splice(index, 1);
        }
    }

    public submit(): void {
        if (this.selectedAnswers.length > 0) {
            // Останавливаем таймер при отправке
            this.timer.stop();

            const answers = this.selectedAnswers.map(id => ({ answerId: id }));
            this.submitAnswers(answers);
        }
    }

}