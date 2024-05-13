import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerComponent, CircleTimerModule} from '@flxng/circle-timer';
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../../../shared/shared.module";
import {CountdownModule} from "ngx-countdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-choose-singe-option-question',
  standalone: true,
  imports: [MatDividerModule, MatRadioButton, CountdownModule ,MatButtonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './choose-singe-option-question.component.html',
  styleUrl: './choose-singe-option-question.component.css'
})
export class ChooseSingeOptionQuestionComponent extends QuestionTemplateComponent
{
  @ViewChild('button') button : ElementRef | undefined;
  answerId : number = -1;

  onTimerComplete() {
    this.submitQuestion();
  }

  submitQuestion() {
    if(this.question && this.button) {
      this.button.nativeElement.textContent = 'Текст после нажатия';
      this.button.nativeElement.disabled = true;
      let answer = structuredClone(this.question.answers[0])
      answer.id = this.answerId;
      this.sessionService.answer([answer]);
    }
  }
}
