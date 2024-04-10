import {Component, EventEmitter, Output} from '@angular/core';
import {slideToLeftAnimation} from "../../../animations/slide-to-left";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ImageUploadComponent} from "../../image-upload/image-upload.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {QuizService} from "../../../service/quiz.service";
import {Answer} from "../../../models/quiz-answer-model";
import {ChooseQuestionComponent} from "../choose-question/choose-question.component";
import {ActivatedRoute, Router, RouteReuseStrategy} from "@angular/router";
import {environment} from "../../../enviroment/enviroment.development";
import {MatDialog} from "@angular/material/dialog";
import {CustomRouteReuseStrategy} from "../../../enviroment/router-reuse-strategy";

@Component({
  selector: 'app-create-choose-option-question',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    ImageUploadComponent, MatCheckbox, MatIconModule, ChooseQuestionComponent],
  templateUrl: './create-choose-option-question.component.html',
  styleUrl: './create-choose-option-question.component.css',
  animations: [slideToLeftAnimation],
})
export class CreateChooseOptionQuestionComponent {
    form = this.fb.group({
    "questionText": new FormControl<string>("",
      [Validators.required, Validators.maxLength(364), Validators.minLength(1)]),
      "timeLimit": new FormControl<number>(60, [Validators.min(5)]),
      answers: this.fb.array([])
    });

  constructor(private fb: FormBuilder, private quizService: QuizService, private  router: Router, public dialog: MatDialog, private route: ActivatedRoute) {}

  @Output() questionCreated = new EventEmitter<any>();

  questionImageUrl: string = '';

  // https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router
  // не я эту хуйню придумал, но почему это не предусмотрено в ангуляре я чет не понимаю TODO: спроси
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }

  private addQuestion()
  {
    const answersArray = this.answers.controls.map(control => {
      return { id: 0, mediaUrl: '', text: control.get('isTrue')?.value, correct: control.get('isTrue')?.value };
    });

    this.quizService.addQuestion(
      {
        id: 0,
        text: this.timeLimit.get("questionText")?.value,
        mediaUrl: this.questionImageUrl,
        type: 'choose_option',
        timeLimitSeconds: this.timeLimit.get("timeLimit")?.value,
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

  submitQuestion() {
    this.addQuestion();
    /*const questionData = {
      text: this.questionText,
      image: this.questionImage,
      answers: this.answers
    };
    this.questionCreated.emit(questionData);*/
    const dialogRef = this.dialog.open(ChooseQuestionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === environment.choose_option || result === environment.choose_mult_options || result === environment.input_text) {
       // this.router.navigate(["../" + result], { relativeTo: this.route });
        this.redirectTo("../" + result);
      }
    });
  }

  onCreateQuizClick() {
    this.addQuestion();
    // допилитьrouter.navigate('quiz')
  }

  onTitleImageUrlGet($event: string) {
    this.questionImageUrl = $event;
  }

  public get answers() {
    return this.form.controls["answers"] as FormArray;
  }
  public get questionText() {
    return this.form.controls["questionText"] as FormControl<string>;
  }
  public get timeLimit() {
    return this.form.controls["timeLimit"] as FormControl<number>;
  }

  ngOnInit()
  {
    this.addAnswer();

  }
}
