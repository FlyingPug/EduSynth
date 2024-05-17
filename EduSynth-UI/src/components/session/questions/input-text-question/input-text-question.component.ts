import {Component, ElementRef, ViewChild} from '@angular/core';
import {QuestionTemplateComponent} from "../question-template.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatRadioButton} from "@angular/material/radio";
import {CircleTimerModule} from "@flxng/circle-timer";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../../../../shared/shared.module";
import {CountdownModule} from "ngx-countdown";
import {UserAnswerDto} from "../../../../models/session/user-answer-dto";

@Component({
  selector: 'app-input-text-question',
  standalone: true,
  imports: [MatDividerModule, MatRadioButton, CountdownModule , MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input-text-question.component.html',
  styleUrl: './input-text-question.component.css'
})
export class InputTextQuestionComponent  extends QuestionTemplateComponent {

  @ViewChild('button') button : ElementRef | undefined;

  formGroup: FormGroup = new FormGroup({
    "answer": new FormControl<string>("",
      [Validators.required, Validators.maxLength(500), Validators.minLength(3)])});

  public get answer() : FormControl<string> { return this.formGroup.get("answer") as FormControl<string> }

  submitQuestion() {
    if(this.question && this.button) {
      this.button.nativeElement.textContent = 'Текст после нажатия';
      this.button.nativeElement.disabled = true;
      let answer = new UserAnswerDto(this.question.answers[0].id, this.formGroup.get('answer')?.value);
      this.sessionService.answer([answer]);
    }
  }

  onTimerComplete() {
    this.submitQuestion();
  }
}
