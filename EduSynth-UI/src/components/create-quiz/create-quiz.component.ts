import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {
  public formGroup: FormGroup = new FormGroup(
    {
      "name": new FormControl<string>("",
        [Validators.required, Validators.maxLength(18), Validators.minLength(4)]),
      "description": new FormControl<string>("",
        [Validators.maxLength(500)])

    })

  public get name() : FormControl<string> { return this.formGroup.get("name") as FormControl<string> }

  onJoinGameClicked()
  {

  }
}
