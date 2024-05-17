import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerComponent, CircleTimerModule} from "@flxng/circle-timer";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Answer} from "../../../../models/quiz/quiz-answer-model";
import {SharedModule} from "../../../../shared/shared.module";
import {CountdownConfig, CountdownModule} from "ngx-countdown";
import {BrowserModule} from "@angular/platform-browser";
import {SessionService} from "../../../../service/session.service";
import {UserAnswerDto} from "../../../../models/session/user-answer-dto";

@Component({
  selector: 'app-choose-multiple-options-question',
  standalone: true,
  imports: [MatDividerModule, MatRadioButton,BrowserModule, CountdownModule,MatButtonModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './choose-multiple-options-question.component.html',
  styleUrl: './choose-multiple-options-question.component.css'
})
export class ChooseMultipleOptionsQuestionComponent  extends QuestionTemplateComponent {

  @ViewChild('button') button : ElementRef | undefined;

  answers : Answer[];
  formGroup : FormGroup;

  constructor(protected override sessionService: SessionService) {
    super(sessionService);

    if (this.question) {
      this.answers = this.question.answers

      this.formGroup = new FormGroup(
        this.answers.reduce((group : { [key: number]: FormControl }, answer : Answer) => {
          group[answer.id] = new FormControl(false); // Инициализируем все чекбоксы как не выбранные
          return group;
        }, {}));
    }
    else
    {
      this.answers = [];
      this.formGroup =  new FormGroup({});
    }
  }


  getSelectedAnswers() : UserAnswerDto[] {
    return Object.keys(this.formGroup.value).filter(key => this.formGroup.get(key)?.value).map(Number).map(id => ({
      answerId: id,
      answer: "",
    }));
  }

  onTimerComplete() {
    this.submitQuestion();
  }

  submitQuestion() {
    if(this.question && this.button) {
      this.button.nativeElement.textContent = 'Текст после нажатия';
      this.button.nativeElement.disabled = true;
      this.sessionService.answer(this.getSelectedAnswers());
    }
  }
}
