import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerComponent} from "@flxng/circle-timer";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormControl, FormGroup} from "@angular/forms";
import {Answer} from "../../../../models/quiz-answer-model";

@Component({
  selector: 'app-choose-multiple-options-question',
  standalone: true,
  imports: [MatDividerModule, MatRadioButton, CircleTimerComponent,MatButtonModule, MatCheckboxModule],
  templateUrl: './choose-multiple-options-question.component.html',
  styleUrl: './choose-multiple-options-question.component.css'
})
export class ChooseMultipleOptionsQuestionComponent  extends QuestionTemplateComponent {

  @ViewChild('button') button : ElementRef;

  formGroup : FormGroup= new FormGroup(
    this.question.answers.reduce((group, answer) => {
    group[answer.id] = new FormControl(false); // Инициализируем все чекбоксы как не выбранные
  return group;
}, {}));

  getSelectedAnswers() : Answer[] {
    return Object.keys(this.formGroup.value).filter(key => this.formGroup.get(key).value).map(Number).map(id => ({
      id: id,
      text: "",
      mediaUrl:"",
      correct: true,
    }));
  }

  onTimerComplete() {
    this.submitQuestion();
  }

  submitQuestion() {
    this.button.nativeElement.textContent = 'Текст после нажатия';
    this.button.nativeElement.disabled = true;
    let answer = structuredClone(this.question?.answers[0])
    answer.text = this.formGroup.get('answer')?.value;
    this.sessionService.answer(this.getSelectedAnswers());
  }
}
