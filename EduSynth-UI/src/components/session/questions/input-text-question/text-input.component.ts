import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BaseQuestionComponent } from "../base-question.component";
import { TextInputQuestionResponseDto } from "../../../../models/quiz/response/text-input-question-response-model";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { CircleTimerComponent } from "../../../circle-timer/circle-timer.component";
import { MatIconModule } from "@angular/material/icon";

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
        CircleTimerComponent,
        MatIconModule
    ],
    templateUrl: "./text-input.component.html",
    styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent extends BaseQuestionComponent<TextInputQuestionResponseDto> implements OnInit {

    @ViewChild("timer") public timer: CircleTimerComponent;
    @ViewChildren("charInput") public charInputs: QueryList<ElementRef>;

    public characterControls: FormControl[] = [];
    public answerLength: number = 0;
    public currentFocusIndex: number = 0;
    public timeRemaining = 0;
    public timeWarning = false;

    public ngOnInit(): void {
        this.timeLimitSeconds = this.question.timeLimitSeconds || 30;
        this.timeRemaining = this.timeLimitSeconds;

        this.answerLength = this.question.answerLength || 5;

        this.initializeCharacterControls();
        this.initializeForm();
    }

    private initializeCharacterControls(): void {
        for (let i = 0; i < this.answerLength; i++) {
            this.characterControls.push(new FormControl("", [Validators.required]));
        }
    }

    protected initializeForm(): void {
        const formControls: { [key: string]: FormControl } = {};

        this.characterControls.forEach((control, index) => {
            formControls[`char${index}`] = control;
        });

        this.form = new FormGroup(formControls);
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.timer.start();
        }, 100);

        setTimeout(() => {
            this.focusInput(0);
        }, 300);
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

    public onKeyDown(event: KeyboardEvent, index: number): void {
        const target = event.target as HTMLInputElement;

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            this.focusInput(Math.max(0, index - 1));
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            this.focusInput(Math.min(this.answerLength - 1, index + 1));
        } else if (event.key === "Backspace") {
            if (!target.value) {
                event.preventDefault();
                this.focusInput(Math.max(0, index - 1));
            }
        } else if (event.key === "Delete") {
            this.characterControls[index].setValue("");
        } else if (event.key.length === 1 && /^[a-zA-Zа-яА-Я0-9]$/.test(event.key)) {
            event.preventDefault();

            this.characterControls[index].setValue(event.key.toUpperCase());

            if (index < this.answerLength - 1) {
                this.focusInput(index + 1);
            }
        }
    }

    public onFocus(index: number): void {
        this.currentFocusIndex = index;
    }

    private focusInput(index: number): void {
        this.currentFocusIndex = index;

        setTimeout(() => {
            const inputs = this.charInputs.toArray();
            if (inputs[index]) {
                inputs[index].nativeElement.focus();
            }
        }, 0);
    }

    public getFilledCharactersCount(): number {
        return this.characterControls.filter(control => control.value).length;
    }

    public isAnswerComplete(): boolean {
        return this.getFilledCharactersCount() === this.answerLength;
    }

    public clearAll(): void {
        this.characterControls.forEach(control => control.setValue(""));

        this.focusInput(0);
    }

    public submit(): void {
        if (this.isAnswerComplete()) {
            this.timer.stop();
            const answer = this.characterControls
                .map(control => control.value)
                .join("");
            this.submitAnswers([{
                answer: answer
            }]);
        }
    }

}