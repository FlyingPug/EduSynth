import {Question} from "./quiz-question-model";
import {UntypedFormGroup} from "@angular/forms";

export class Quiz {
  id: number;
  title: string;
  description: string;
  titleMediaUrl: string;
  creatorId: number;
  questions: Question[];
  isPublic: boolean;


  constructor(title: string, description: string, titleMediaUrl: string, isPublic: boolean) {
    this.title = title;
    this.description = description;
    this.titleMediaUrl = titleMediaUrl;
    this.isPublic = isPublic;
    this.id = 0;
    this.creatorId = 0;
    this.questions = []
  }
}
