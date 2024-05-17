import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerComponent, CircleTimerModule} from '@flxng/circle-timer';
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../../shared/shared.module";
import {CountdownModule} from "ngx-countdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionService} from "../../../../service/session.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {UserAnswerDto} from "../../../../models/session/user-answer-dto";

@Component({
  selector: 'app-choose-singe-option-question',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatRadioButton, CountdownModule ,MatButtonModule, ReactiveFormsModule,FormsModule, MatFormFieldModule],
  templateUrl: './choose-singe-option-question.component.html',
  styleUrl: './choose-singe-option-question.component.css'
})
export class ChooseSingeOptionQuestionComponent extends QuestionTemplateComponent
{
  @ViewChild('button') button : HTMLButtonElement | undefined;
  answerId : number = -1;
  gay: any;

  constructor(protected override sessionService: SessionService) {
    super(sessionService);
  }

  onTimerComplete() {
    console.log('huhHH SDHFG HSDFH SDH FSDH DFSH HFSDHSDFHFDSHFDSHFSHD');
   // this.submitQuestion();
  }

  submitQuestion() {
    if(this.question && this.button) {
      this.button.textContent = 'Текст после нажатия';
      this.button.disabled = true;
      let answer = new UserAnswerDto(this.answerId, "");
      console.log('SENDING ANSWER', answer, this.question);
      this.sessionService.answer([answer]);
    }
  }


  onAnswerChange(id : number) {
    console.log('CHOOSEN ANSWER ID IS ', id);
    this.answerId = id;
  }
}
