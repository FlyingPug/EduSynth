import {AfterViewInit, Component, computed, effect, EffectRef, Signal, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerComponent, CircleTimerModule} from '@flxng/circle-timer';
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../../shared/shared.module";
import {CountdownComponent, CountdownEvent, CountdownModule, CountdownStatus} from "ngx-countdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionService} from "../../../../service/session.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {UserAnswerDto} from "../../../../models/session/user-answer-dto";
import {CircleCountdownComponent, CircleCountdownModule} from "ng-circle-countdown";

@Component({
  selector: 'app-choose-singe-option-question',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatRadioButton, CircleCountdownModule ,MatButtonModule, ReactiveFormsModule,FormsModule, MatFormFieldModule],

  templateUrl: './choose-singe-option-question.component.html',
  styleUrl: './choose-singe-option-question.component.css'
})
export class ChooseSingeOptionQuestionComponent extends QuestionTemplateComponent implements AfterViewInit
{

  answerId : number = -1;
  gay: any;
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
  constructor(sessionService: SessionService) {
    super(sessionService);
  }


  onTimerComplete() {
    this.submitQuestion();
  }

  submitQuestion() {
    if(this.currentQuestion) {
      this.isDisabled = true;
      let answer = new UserAnswerDto(this.answerId, "");
      console.log('SENDING ANSWER', answer, this.currentQuestion);
      this.sessionService.answer([answer]);
    }
  }

  onAnswerChange(id : number) {
    console.log('CHOOSEN ANSWER ID IS ', id);
    this.answerId = id;
  }
}
