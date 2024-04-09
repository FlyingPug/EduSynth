import { Component } from '@angular/core';
import {slideToLeftAnimation} from "../../../animations/slide-to-left";

@Component({
  selector: 'app-create-input-text-question',
  standalone: true,
  imports: [],
  templateUrl: './create-input-text-question.component.html',
  styleUrl: './create-input-text-question.component.css',
  animations: [slideToLeftAnimation]
})
export class CreateInputTextQuestionComponent {

}
