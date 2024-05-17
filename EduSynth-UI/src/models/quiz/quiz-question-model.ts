import {Answer} from "./quiz-answer-model";
import {QuestionType} from "../enums/question-type";

export interface Question {
  id: number;
  text: string;
  mediaUrl: string;
  type: QuestionType.InputAnswer | QuestionType.MultipleOptions | QuestionType.SingleOption;
  timeLimitSeconds: number;
  answers: Answer[];
}
//    choose_option,
//     choose_mult_options,
//     input_text
// }
