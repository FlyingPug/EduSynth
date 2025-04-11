import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BaseQuestionComponent } from "../base-question.component";
import { TextInputQuestionResponseDto } from "../../../../models/quiz/response/text-input-question-response-model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CircleCountdownModule } from "ng-circle-countdown";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-text-input-question",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        CircleCountdownModule
    ],
    templateUrl: "./text-input.component.html",
    styleUrls: ["../base-question.component.scss"]
})
export class TextInputComponent extends BaseQuestionComponent<TextInputQuestionResponseDto> {

    public answerControl = new FormControl<string>("");

    constructor() {
        super();
        this.timeLimitSeconds = this.question.timeLimitSeconds || 30;
        this.initializeForm();
    }

    protected initializeForm(): void {
        this.form = new FormGroup({ answer: this.answerControl });
    }

    public submit(): void {
        this.submitAnswers([{ answer: this.answerControl.value || "" }]);
    }

}