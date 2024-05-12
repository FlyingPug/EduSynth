import {Answer} from "./quiz-answer-model";

export class UserAnswerSessionForm
{
  sessionCode: string;
  answers: Answer[];

  constructor(sessionCode: string, answers: Answer[]) {
    this.sessionCode = sessionCode;
    this.answers = answers;
  }
}
