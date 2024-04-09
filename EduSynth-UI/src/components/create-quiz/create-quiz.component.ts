import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {Quiz} from "../../models/quiz-model";
import {QuizService} from "../../service/quiz.service";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChooseQuestionComponent} from "./choose-question/choose-question.component";
import {ImageUploadComponent} from "../image-upload/image-upload.component";
import {slideToLeftAnimation} from "../../animations/slide-to-left";
import {environment} from "../../enviroment/enviroment.development";

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatCheckbox, ImageUploadComponent],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
  animations: [slideToLeftAnimation]
})
export class CreateQuizComponent {
  private imageUrl: string = '';

  public formGroup: FormGroup = new FormGroup(
    {
      "name": new FormControl<string>("",
        [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
      "description": new FormControl<string>("",
        [Validators.maxLength(500)]),
      "isPublic": new FormControl<boolean>(true)
    })

  public get name() : FormControl<string> { return this.formGroup.get("name") as FormControl<string> }
  public get description() : FormControl<string> { return this.formGroup.get("description") as FormControl<string> }
  public get isPublic() : FormControl<boolean> { return this.formGroup.get("isPublic") as FormControl<boolean> }

  onTitleImageUrlGet(imageUrl : string)
  {
    this.imageUrl = imageUrl;
  }

  constructor(private quizService : QuizService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
  }

  onCreateQuizClick()
  {
    this.quizService.createNewQuiz(this.formGroup.get("name")?.value,
      this.formGroup.get("description")?.value,
      this.formGroup.get("public")?.value,
      this.imageUrl
      )

    const dialogRef = this.dialog.open(ChooseQuestionComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === environment.choose_option || result === environment.choose_mult_options || result === environment.input_text) {
        this.router.navigate(["../" + result], { relativeTo: this.route });
      }
    });
  }
}
