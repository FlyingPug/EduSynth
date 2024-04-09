import {Component, EventEmitter, Output} from '@angular/core';
import {slideToLeftAnimation} from "../../../animations/slide-to-left";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-choose-option-question',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-choose-option-question.component.html',
  styleUrl: './create-choose-option-question.component.css',
  animations: [slideToLeftAnimation]
})
export class CreateChooseOptionQuestionComponent {
  public formGroup: FormGroup = new FormGroup(
    {
      "name": new FormControl<string>("",
        [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
    })

  @Output() questionCreated = new EventEmitter<any>();

  questionText: string = '';
  questionImage: string = '';
  answers: { text: string, correct: boolean }[] = [{ text: '', correct: false }];

  addAnswer() {
    if (this.answers.length < 8) {
      this.answers.push({ text: '', correct: false });
    }
  }

  removeAnswer(index: number) {
    if (this.answers.length > 1) {
      this.answers.splice(index, 1);
    }
  }

  submitQuestion() {
    const questionData = {
      text: this.questionText,
      image: this.questionImage,
      answers: this.answers
    };
    this.questionCreated.emit(questionData);
  }
}
