/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MultipleChoiceQuestionResponseDto } from "../../../../models/quiz/response/multiple-choise-question-request-model";
import { BaseQuestionComponent } from "../base-question.component";
import { CircleCountdownModule } from "ng-circle-countdown";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";

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
        MatCardModule
    ],
    templateUrl: "./multiple-choice.component.html",
    styleUrls: ["../base-question.component.scss"]
})
export class MultipleChoiceComponent extends BaseQuestionComponent<MultipleChoiceQuestionResponseDto> {

    constructor() {
        super();
        this.timeLimitSeconds = this.question.timeLimitSeconds || 30;
        this.initializeForm();
    }

    protected initializeForm(): void {
        const controls: { [key: string]: FormControl<boolean | null> } = {};
        this.question.answers.forEach(a => controls[a.id] = new FormControl<boolean>(false));
        this.form = new FormGroup(controls);
    }

    public submit(): void {
        const answers = Object.entries(this.form.value)
            .filter(([_, val]) => val)
            .map(([id]) => ({ answerId: +id }));
        this.submitAnswers(answers);
    }

}