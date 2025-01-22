import { AfterViewInit, Component, computed, effect, EffectRef, Signal, ViewChild } from "@angular/core";
import { QuestionTemplateComponent } from "../question-template.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { UserAnswerDto } from "../../../../models/session/user-answer-dto";
import { SessionService } from "../../../../service/session.service";
import { CircleCountdownComponent, CircleCountdownModule } from "ng-circle-countdown";

@Component({
    selector: "app-input-text-question",
    standalone: true,
    imports: [MatDividerModule, CircleCountdownModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
    templateUrl: "./input-text-question.component.html",
    styleUrl: "./input-text-question.component.css"
})
export class InputTextQuestionComponent extends QuestionTemplateComponent implements AfterViewInit {

    @ViewChild("timer") public circleTimer! : CircleCountdownComponent;
    public isDisabled: boolean = false;

    public formGroup: FormGroup = new FormGroup({
        "answer": new FormControl<string>("",
            [Validators.required, Validators.maxLength(500), Validators.minLength(3)])
    });

    public isCompleted: Signal<boolean> = computed(() => this.circleTimer.countDown().isCompleted);
    private effect : EffectRef = effect(() => {
        if (this.isCompleted()) {
            this.onTimerComplete();
        }
    });

    constructor(sessionService: SessionService) {
        super(sessionService);
    }

    public ngAfterViewInit(): void {
        this.circleTimer.start();
    }

    public get answer() : FormControl<string> { return this.formGroup.get("answer") as FormControl<string>; }

    public submitQuestion(): void {
        if (this.currentQuestion) {
            this.isDisabled = true;
            const answer = new UserAnswerDto(this.currentQuestion.answers[0].id, this.formGroup.get("answer")?.value);
            this.sessionService.answer([answer]);
        }
    }

    private onTimerComplete(): void{
        this.submitQuestion();
    }

}
