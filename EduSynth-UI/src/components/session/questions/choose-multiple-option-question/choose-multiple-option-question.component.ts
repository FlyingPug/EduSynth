import { AfterViewInit, Component, computed, effect, EffectRef, Signal, ViewChild } from '@angular/core';
import { Answer } from '../../../../models/quiz/quiz-answer-model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '../../../../service/session.service';
import { UserAnswerDto } from '../../../../models/session/user-answer-dto';
import { QuestionTemplateComponent } from '../question-template.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CountdownComponent, CountdownEvent, CountdownStatus } from 'ngx-countdown';
import { MatDividerModule } from '@angular/material/divider';
import { CircleCountdownComponent, CircleCountdownModule, CountdownService } from 'ng-circle-countdown';

@Component({
    selector: 'app-choose-multiple-option-question',
    standalone: true,
    imports: [CommonModule, MatCheckboxModule, MatButtonModule, FormsModule, ReactiveFormsModule, CircleCountdownModule, MatDividerModule],
    templateUrl: './choose-multiple-option-question.component.html',
    styleUrl: './choose-multiple-option-question.component.css'
})
export class ChooseMultipleOptionQuestionComponent extends QuestionTemplateComponent implements  AfterViewInit {

    answers : Answer[] = [];
    formGroup : FormGroup = new FormGroup({});
    isDisabled: boolean = false;

    @ViewChild('timer') public circleTimer! : CircleCountdownComponent;
    public isCompleted: Signal<boolean> = computed(() => this.circleTimer.countDown().isCompleted);
    private effect :  EffectRef = effect(() => {
        if (this.isCompleted()) {
            this.onTimerComplete();
        }
    });


    ngAfterViewInit() {
        this.circleTimer.start();
    }

    constructor(sessionService: SessionService, private countdownService: CountdownService) {
        console.log('CREATING MULTIPLIE SINGLE OPTION COMPONENT');
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

    getSelectedAnswers() : UserAnswerDto[] {
        return Object.keys(this.formGroup.value).filter(key => this.formGroup.get(key)?.value).map(Number).map(id => ({
            answerId: id,
            answer: '',
        }));
    }

    onTimerComplete() {
        console.log('SDFSDFSDFSDSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
        this.submitQuestion();
    }

    submitQuestion() {
        if (this.currentQuestion) {
            this.isDisabled = true;
            this.sessionService.answer(this.getSelectedAnswers());
        }
    }

    onInputChange() {
        this.isDisabled = false;
    }
}
