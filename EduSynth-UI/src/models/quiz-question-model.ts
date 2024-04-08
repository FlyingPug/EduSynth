import {Answer} from "./quiz-answer-model";

export interface Question {
  id: number;
  text: string;
  mediaUrl: string;
  type: 'choose_option' | 'choose_mult_options' | 'input_text';
  timeLimitSeconds: number;
  answers: Answer[];
}
//    choose_option,
//     choose_mult_options,
//     input_text
// }
