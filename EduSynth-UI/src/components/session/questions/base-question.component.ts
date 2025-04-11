import { Component, inject, DestroyRef, Input, ViewChild } from "@angular/core";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { QuestionResponseDto } from "../../../models/quiz/response/question-response-model";
import { IUserAnswerDto } from "../../../models/session/user-answer-model";
import { SessionService } from "../../../service/session.service";
import { BaseComponent } from "../../base.component";
import { CircleCountdownComponent } from "ng-circle-countdown";

@Component({
    template: "",
    standalone: true,
    imports: [ReactiveFormsModule]
})
export abstract class BaseQuestionComponent<T extends QuestionResponseDto> extends BaseComponent {

    protected readonly sessionService = inject(SessionService);
    protected readonly destroyRef = inject(DestroyRef);

    @ViewChild("timer") public timer!: CircleCountdownComponent;
    @Input({ required: true }) public sessionCode!: string;
    @Input({ required: true }) public question!: T;

    public isSubmitting = false;
    public form!: FormGroup;
    public timeLimitSeconds = 30;

    protected abstract initializeForm(): void;

    public ngAfterViewInit(): void {
        this.timer.start();
    }

    protected async submitAnswers(answers: IUserAnswerDto[]): Promise<void> {
        if (this.isSubmitting) return;

        this.isSubmitting = true;
        await this.sessionService.answer(this.sessionCode, answers);
    }

}