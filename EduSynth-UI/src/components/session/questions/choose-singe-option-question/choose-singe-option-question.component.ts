import { AfterViewInit, Component, computed, effect, EffectRef, Signal, ViewChild } from "@angular/core";
import { QuestionTemplateComponent } from "../question-template.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SessionService } from "../../../../service/session.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { UserAnswerDto } from "../../../../models/session/user-answer-dto";
import { CircleCountdownComponent, CircleCountdownModule } from "ng-circle-countdown";

@Component({
    selector: "app-choose-singe-option-question",
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        MatRadioButton,
        CircleCountdownModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatRadioGroup
    ],
    templateUrl: "./choose-singe-option-question.component.html",
    styleUrl: "./choose-singe-option-question.component.css"
})
export class ChooseSingeOptionQuestionComponent extends QuestionTemplateComponent implements AfterViewInit {

    public answerId : number = -1;
    public gay: any;
    public isDisabled: boolean = false;

    @ViewChild("timer") public circleTimer! : CircleCountdownComponent;
    public isCompleted: Signal<boolean> = computed(() => this.circleTimer.countDown().isCompleted);
    private effect : EffectRef = effect(() => {
        if (this.isCompleted()) {
            this.onTimerComplete();
        }
    });

    public ngAfterViewInit(): void {
        this.circleTimer.start();
    }

    constructor(sessionService: SessionService) {
        super(sessionService);
    }

    public onTimerComplete(): void {
        this.submitQuestion();
    }

    public submitQuestion(): void {
        if (this.currentQuestion) {
            this.isDisabled = true;
            const answer = new UserAnswerDto(this.answerId, "");

            this.sessionService.answer([answer]);
        }
    }

    public onAnswerChange(id : number): void {
        this.answerId = id;
    }

}
