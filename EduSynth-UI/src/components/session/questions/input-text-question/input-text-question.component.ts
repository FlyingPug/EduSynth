import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerComponent} from "@flxng/circle-timer";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-input-text-question',
  standalone: true,
  imports: [MatDividerModule, MatRadioButton, CircleTimerComponent,MatButtonModule, MatInputModule],
  templateUrl: './input-text-question.component.html',
  styleUrl: './input-text-question.component.css'
})
export class InputTextQuestionComponent  extends QuestionTemplateComponent {

  @ViewChild('button') button : ElementRef;

  formGroup: FormGroup = new FormGroup({
    "answer": new FormControl<string>("",
      [Validators.required, Validators.maxLength(500), Validators.minLength(3)])});

  submitQuestion() {
    this.button.nativeElement.textContent = 'Текст после нажатия';
    this.button.nativeElement.disabled = true;
    let answer = structuredClone(this.question.answers[0])
    answer.text = this.formGroup.get('answer')?.value;
    this.sessionService.answer([answer]);
  }

  onTimerComplete() {
    this.submitQuestion();
  }
}
