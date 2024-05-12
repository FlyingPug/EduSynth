import { Component } from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {CommonModule} from "@angular/common";
import {Question} from "../../../models/quiz-question-model";

export abstract class QuestionTemplateComponent {

  public question : Question;

  protected constructor(protected  sessionService : SessionService) {
  }

  ngOnInit()
  {
    this.question = sessionStorage.getCurrentQuestion();
  }

}
