import { Component } from '@angular/core';
import {slideToLeftAnimation} from "../../../animations/slide-to-left";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ImageUploadComponent} from "../../image-upload/image-upload.component";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgForOf} from "@angular/common";
import {QuizService} from "../../../service/quiz.service";
import {ChooseQuestionComponent} from "../choose-question/choose-question.component";
import {environment} from "../../../enviroment/enviroment.development";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {QuestionCreator} from "../question-creator";

@Component({
  selector: 'app-create-input-text-question',
  standalone: true,
  imports: [
    ImageUploadComponent,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    MatRadioButton,
    MatRadioGroup,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './create-input-text-question.component.html',
  styleUrl: './create-input-text-question.component.css',
  animations: [slideToLeftAnimation]
})
export class CreateInputTextQuestionComponent extends QuestionCreator{

  constructor(fb: FormBuilder, quizService: QuizService, router: Router, dialog: MatDialog, route: ActivatedRoute) {
    super(fb, quizService, router, dialog, route); // Вызов конструктора родительского класса с помощью super
  }

  questionImageUrl: string = '';

  form = this.fb.group({
    "questionText": new FormControl<string>("",
      [Validators.required, Validators.maxLength(364), Validators.minLength(1)]),
    "timeLimit": new FormControl<number>(60, [Validators.min(5)]),
    answers: this.fb.array([]),
    "answer": new FormControl<string>("", [Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
  });

  public get questionText() {
    return this.form.controls["questionText"] as FormControl<string>;
  }
  public get timeLimit() {
    return this.form.controls["timeLimit"] as FormControl<number>;
  }
  public get answer()
  {
    return this.form.controls["answer"] as FormControl<string>;
  }

  onTitleImageUrlGet($event: string) {
    this.questionImageUrl = $event;
  }

  public override addQuestion()
  {
    this.quizService.addQuestion(
      {
        id: 0,
        text: this.questionText.get("questionText")?.value,
        mediaUrl: this.questionImageUrl,
        type: 'input_text',
        timeLimitSeconds: this.timeLimit.get("timeLimit")?.value,
        answers: [this.answer.get("answer")?.value],
      }
    )
  }
}
