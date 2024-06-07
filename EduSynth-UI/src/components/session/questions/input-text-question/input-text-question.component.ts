import {AfterViewInit, Component, computed, effect, EffectRef, Signal, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerModule} from "@flxng/circle-timer";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../../../../shared/shared.module";
import {CountdownComponent, CountdownConfig, CountdownEvent, CountdownModule, CountdownStatus} from "ngx-countdown";
import {UserAnswerDto} from "../../../../models/session/user-answer-dto";
import {SessionService} from "../../../../service/session.service";
import {CircleCountdownComponent, CircleCountdownModule} from "ng-circle-countdown";

@Component({
  selector: 'app-input-text-question',
  standalone: true,
  imports: [MatDividerModule, MatRadioButton, CircleCountdownModule , MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input-text-question.component.html',
  styleUrl: './input-text-question.component.css'
})
export class InputTextQuestionComponent  extends QuestionTemplateComponent {
  constructor(sessionService: SessionService) {
    super(sessionService);
    console.log('CREATING INPUT SINGLE OPTION COMPONENT');
  }
  isDisabled: boolean = false;

  @ViewChild('timer') public circleTimer! : CircleCountdownComponent;
  public isCompleted: Signal<boolean> = computed(() => this.circleTimer.countDown().isCompleted);
  private effect :  EffectRef = effect(() => {
    if(this.isCompleted())
    {
      this.onTimerComplete();
    }
  });


  ngAfterViewInit() {
    this.circleTimer.start();
  }


  formGroup: FormGroup = new FormGroup({
    "answer": new FormControl<string>("",
      [Validators.required, Validators.maxLength(500), Validators.minLength(3)])});

  public get answer() : FormControl<string> { return this.formGroup.get("answer") as FormControl<string> }

  submitQuestion() {
    if(this.currentQuestion) {
      this.isDisabled = true;
      let answer = new UserAnswerDto(this.currentQuestion.answers[0].id, this.formGroup.get('answer')?.value);
      this.sessionService.answer([answer]);
    }
  }

  onTimerComplete() {
      this.submitQuestion();
  }
}
