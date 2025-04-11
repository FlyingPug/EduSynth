import { Component } from "@angular/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { BaseQuestionComponent } from "../base-question.component";
import { SingleChoiceQuestionResponseDto } from "../../../../models/quiz/response/single-choice-question-response-model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CircleCountdownModule } from "ng-circle-countdown";

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
        CircleCountdownModule
    ],
    templateUrl: "./single-choice.component.html",
    styleUrls: ["../base-question.component.scss"]
})
export class SingleChoiceComponent extends BaseQuestionComponent<SingleChoiceQuestionResponseDto> {

    public selectedAnswer = new FormControl<number | null>(null);

    constructor() {
        super();
        this.timeLimitSeconds = this.question.timeLimitSeconds || 30;
        this.initializeForm();
    }

    protected initializeForm(): void {
        this.form = new FormGroup({ answer: this.selectedAnswer });
    }

    public submit(): void {
        if (this.selectedAnswer.value) {
            this.submitAnswers([{ answerId: this.selectedAnswer.value }]);
        }
    }

}