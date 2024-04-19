import {Component, EventEmitter, Output} from '@angular/core';
import {slideToLeftAnimation} from "../../../animations/slide-to-left";
import {ImageUploadComponent} from "../../image-upload/image-upload.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {QuizService} from "../../../service/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChooseQuestionComponent} from "../choose-question/choose-question.component";
import {MatRadioModule} from "@angular/material/radio";
import {QuestionCreator} from "../question-creator";
import {QuestionType} from "../../../models/enums/question-type";

@Component({
  selector: 'app-create-choose-multiplie-options-question',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    ImageUploadComponent, MatCheckbox, MatIconModule, ChooseQuestionComponent,
    MatRadioModule],
  templateUrl: './create-choose-multiplie-options-question.component.html',
  styleUrl: './create-choose-multiplie-options-question.component.css',
  animations: [slideToLeftAnimation]
})
export class CreateChooseMultiplieOptionsQuestionComponent extends QuestionCreator
{
  constructor(fb: FormBuilder, quizService: QuizService, router: Router, dialog: MatDialog, route: ActivatedRoute) {
    super(fb, quizService, router, dialog, route); // Вызов конструктора родительского класса с помощью super
  }

  form = this.fb.group({
    "questionText": new FormControl<string>("",
      [Validators.required, Validators.maxLength(364), Validators.minLength(1)]),
    "timeLimit": new FormControl<number>(60, [Validators.min(5)]),
    answers: this.fb.array([])
  });

  @Output() questionCreated = new EventEmitter<any>();

  questionImageUrl: string = '';

  public override addQuestion()
  {
    const answersArray = this.answers.controls.map(control => {
      return { id: 0, mediaUrl: '', text: control.get('text')?.value, correct: control.get('isTrue')?.value };
    });

    this.quizService.addQuestion(
      {
        id: 0,
        text: this.questionText?.value,
        mediaUrl: this.questionImageUrl,
        type: QuestionType.MultipleOptions,
        timeLimitSeconds: this.timeLimit?.value,
        answers: answersArray,
      }
    )
  }

  addAnswer() {
    if (this.answers.length < 6) {
      const answerForm = this.fb.group({
        text: ['',[ Validators.required, Validators.minLength(1)]],
        isTrue: [false]
      });

      this.answers.push(answerForm);
    }
  }

  removeAnswer(index: number) {
    if (this.answers.length > 1) {
      this.answers.removeAt(index);
    }
  }

  onTitleImageUrlGet($event: string) {
    this.questionImageUrl = $event;
  }

  public get answers() {
    return this.form.controls["answers"] as FormArray;
  }
  public get questionText() {
    return this.form.get("questionText") as FormControl<string>;
  }
  public get timeLimit() {
    return this.form.get("timeLimit") as FormControl<number>;
  }

  ngOnInit()
  {
    this.addAnswer();
  }
}
