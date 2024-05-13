import {Component, Injectable} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {CommonModule} from "@angular/common";
import {Question} from "../../../models/quiz-question-model";
import {CountdownConfig} from "ngx-countdown";

@Injectable({
  providedIn: 'root',
})
export abstract class QuestionTemplateComponent {

  public question : Question | undefined;

  config: CountdownConfig = {
    leftTime: this.TimeLimitSeconds,
    format: 'HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  public get TimeLimitSeconds()
  {
    if(this.question?.timeLimitSeconds) return this.question?.timeLimitSeconds
    return 0
  }

  public constructor(protected  sessionService : SessionService)
  {
    this.question = this.sessionService.CurrentQuestion;
  }
}
