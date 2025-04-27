import { Component, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { BaseQuestionComponent } from "../base-question.component";
import { CdkDragDrop, moveItemInArray, DragDropModule } from "@angular/cdk/drag-drop";
import { ChronoOrderQuestionResponseDto } from "../../../../models/quiz/response/chrono-order-question-response-model";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { CircleTimerComponent } from "../../../circle-timer/circle-timer.component";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

interface ChronoEvent {
    id: number;
    text: string;
    orderIndex: number;
  }

@Component({
    selector: "app-chrono-question",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        DragDropModule,
        CircleTimerComponent
    ],
    templateUrl: "./chrono-order.component.html",
    styleUrls: ["./chrono-order.component.scss"]
})
export class ChronoOrderComponent extends BaseQuestionComponent<ChronoOrderQuestionResponseDto> implements OnInit {

    @ViewChild("timer") public timer: CircleTimerComponent;

    public events: ChronoEvent[] = [];
    public originalOrder: ChronoEvent[] = [];
    public timeRemaining = 0;
    public timeWarning = false;

    public ngOnInit(): void {
        this.timeLimitSeconds = this.question.timeLimitSeconds || 60;
        this.timeRemaining = this.timeLimitSeconds;
        this.initializeForm();
    }

    protected override initializeForm(): void {
        const chronoQuestion = this.question as ChronoOrderQuestionResponseDto;

        this.events = chronoQuestion.events.map((event, index) => ({
            id: event.id,
            text: event.text,
            orderIndex: index
        }));

        this.originalOrder = [...this.events];

        this.shuffleEvents();
    }

    private shuffleEvents(): void {
        for (let i = this.events.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.events[i], this.events[j]] = [this.events[j], this.events[i]];
        }
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

    public drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.events, event.previousIndex, event.currentIndex);
    }

    public resetOrder(): void {
        this.shuffleEvents();
    }

    public submit(): void {
        this.timer.stop();

        const answers = this.events.map((event, index) => ({
            answerId: event.id,
            answer: index.toString(),
            orderIndex: index
        }));

        this.submitAnswers(answers);
    }

}