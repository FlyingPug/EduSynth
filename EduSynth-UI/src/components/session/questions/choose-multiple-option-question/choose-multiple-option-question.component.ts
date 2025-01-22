import { AfterViewInit, Component, computed, effect, EffectRef, Signal, ViewChild } from "@angular/core";
import { Answer } from "../../../../models/quiz/quiz-answer-model";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SessionService } from "../../../../service/session.service";
import { UserAnswerDto } from "../../../../models/session/user-answer-dto";
import { QuestionTemplateComponent } from "../question-template.component";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { CircleCountdownComponent, CircleCountdownModule, CountdownService } from "ng-circle-countdown";

@Component({
    selector: "app-choose-multiple-option-question",
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, MatButtonModule, FormsModule, ReactiveFormsModule, CircleCountdownModule, MatDividerModule],
    templateUrl: "./choose-multiple-option-question.component.html",
    styleUrl: "./choose-multiple-option-question.component.css"
})
export class ChooseMultipleOptionQuestionComponent extends QuestionTemplateComponent implements AfterViewInit {

    public answers : Answer[] = [];
    public formGroup : FormGroup = new FormGroup({});
    public isDisabled: boolean = false;

    @ViewChild("timer") public circleTimer! : CircleCountdownComponent;
    public isCompleted: Signal<boolean> = computed(() => this.circleTimer.countDown().isCompleted);
    private effect : EffectRef = effect(() => {
        if (this.isCompleted()) {
            this.onTimerComplete();
        }
    });

    constructor(sessionService: SessionService, private countdownService: CountdownService) {
        super(sessionService);

        if (this.currentQuestion) {
            this.answers = this.currentQuestion.answers;

            this.formGroup = new FormGroup(
                this.answers.reduce((group : { [key: number]: FormControl }, answer : Answer) => {
                    group[answer.id] = new FormControl(false); // Инициализируем все чекбоксы как не выбранные
                    return group;
                }, {}));
        }
    }

    public ngAfterViewInit(): void {
        this.circleTimer.start();
    }

    public getSelectedAnswers() : UserAnswerDto[] {
        return Object.keys(this.formGroup.value).filter(key => this.formGroup.get(key)?.value).map(Number).map(id => ({
            answerId: id,
            answer: "",
        }));
    }

    public onTimerComplete(): void {
        this.submitQuestion();
    }

    public submitQuestion(): void {
        if (this.currentQuestion) {
            this.isDisabled = true;
            this.sessionService.answer(this.getSelectedAnswers());
        }
    }

    public onInputChange(): void {
        this.isDisabled = false;
    }

}
