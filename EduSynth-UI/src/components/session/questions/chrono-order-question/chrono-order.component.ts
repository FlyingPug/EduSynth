import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { BaseQuestionComponent } from "../base-question.component";
import { CdkDragDrop, CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { ChronoOrderQuestionResponseDto } from "../../../../models/quiz/response/chrono-order-question-response-model";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { CircleCountdownModule } from "ng-circle-countdown";

@Component({
    selector: "app-chrono-question",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        CdkDropList,
        CdkDrag,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        CircleCountdownModule
    ],
    templateUrl: "./chrono-order.component.html",
    styleUrls: ["../base-question.component.scss", "./chrono-order.component.scss"]
})
export class ChronoOrderComponent extends BaseQuestionComponent<ChronoOrderQuestionResponseDto> {

    public events: { id: number; text: string }[] = [];

    constructor() {
        super();
        this.timeLimitSeconds = this.question.timeLimitSeconds || 45;
        this.initializeForm();
    }

    protected initializeForm(): void {
        this.events = [...(this.question as ChronoOrderQuestionResponseDto).events];
    }

    public onDrop(event: CdkDragDrop<string[]>): void {
        const movedItem = this.events[event.previousIndex];
        this.events.splice(event.previousIndex, 1);
        this.events.splice(event.currentIndex, 0, movedItem);
    }

    public submit(): void {
        const answers = this.events.map((e, index) => ({
            answerId: e.id,
            orderIndex: index
        }));
        this.submitAnswers(answers);
    }

}