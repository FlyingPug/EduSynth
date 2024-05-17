import {Component, Injectable} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {CommonModule} from "@angular/common";
import {Question} from "../../../models/quiz/quiz-question-model";
import {CountdownConfig} from "ngx-countdown";

@Injectable({
  providedIn: 'root',
})
export abstract class QuestionTemplateComponent {

  protected question : Question | undefined;

  public config: CountdownConfig = {
    leftTime: this.TimeLimitSeconds,
    format: 'HH:mm:ss',
  };

  public get TimeLimitSeconds()
  {
    if(this.question?.timeLimitSeconds) return this.question?.timeLimitSeconds
    return 0
  }

  public get currentQuestion()
  {
    return this.question = this.sessionService.currentQuestion;
  }

  public constructor(protected  sessionService : SessionService)
  {
    this.question = this.sessionService.currentQuestion;
    console.log('current question 2 is ', this.question)
  }
}
