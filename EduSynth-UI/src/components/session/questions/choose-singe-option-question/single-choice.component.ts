import { Component, OnInit, ViewChild } from "@angular/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { BaseQuestionComponent } from "../base-question.component";
import { SingleChoiceQuestionResponseDto } from "../../../../models/quiz/response/single-choice-question-response-model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CircleTimerComponent } from "../../../circle-timer/circle-timer.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-single-choice-question",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatIconModule,
        CircleTimerComponent
    ],
    templateUrl: "./single-choice.component.html",
    styleUrls: ["./single-choice.component.scss"]
})
export class SingleChoiceComponent extends BaseQuestionComponent<SingleChoiceQuestionResponseDto> implements OnInit {

    @ViewChild("timer") public timer: CircleTimerComponent;

    public selectedAnswer = new FormControl<number | null>(null);
    public timeRemaining = 0;
    public timeWarning = false;

    public ngOnInit(): void {
        this.timeLimitSeconds = this.question.timeLimitSeconds || 30;
        this.timeRemaining = this.timeLimitSeconds;
        this.initializeForm();
    }

    protected initializeForm(): void {
        this.form = new FormGroup({ answer: this.selectedAnswer });
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.timer.start();
        }, 100);
    }

    public onTimerComplete(): void {
        this.submit();
    }

    public onTimerTick(seconds: number): void {
        this.timeRemaining = seconds;

        if (seconds <= 10 && !this.timeWarning) {
            this.timeWarning = true;
        }
    }

    public selectAnswer(answerId: number): void {
        this.selectedAnswer.setValue(answerId);
    }

    public submit(): void {
        if (this.selectedAnswer.value) {
            // Останавливаем таймер при отправке
            this.timer.stop();

            this.submitAnswers([{ answerId: this.selectedAnswer.value }]);
        }
    }

}