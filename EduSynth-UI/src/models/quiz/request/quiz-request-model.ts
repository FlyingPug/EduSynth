import { BaseModel } from "../../base-model";
import { QuestionTypeDto } from "../question-type-model";
import { ChronoOrderQuestionRequestDto, IChronoOrderQuestionRequestDto } from "./chrono-order-question-request-model";
import { CrosswordQuestionRequestDto, ICrosswordQuestionRequestDto } from "./crossword-question-request-model";
import { IMultipleChoiceQuestionRequestDto, MultipleChoiceQuestionRequestDto } from "./multiple-choice-question-request-model";
import { IQuestionRequestDto, QuestionRequestDto } from "./question-request-model";
import { ISingleChoiceQuestionRequestDto, SingleChoiceQuestionRequestDto } from "./single-choise-question-request-model";
import { ITextInputQuestionRequestDto, TextInputQuestionRequestDto } from "./text-input-question-request-model";

export interface IQuizRequestDto {
    title: string;
    description: string;
    titleMediaUrl: string;
    isPublic: boolean;
    questions: IQuestionRequestDto[];
}

export class QuizRequestDto extends BaseModel {

    public title: string;
    public description: string;
    public titleMediaUrl: string;
    public isPublic: boolean;
    public questions: QuestionRequestDto[];

    public constructor(quiz: IQuizRequestDto) {
        super();
        this.mapFromJson(quiz);
        console.log(quiz);
        this.questions = quiz.questions?.map(q => this.createQuestion(q)) || [];
    }

    private createQuestion(question: IQuestionRequestDto): QuestionRequestDto {
        console.log(question);
        switch (question.questionType) {
            case QuestionTypeDto.CHOOSE_OPTION:
                return new SingleChoiceQuestionRequestDto(question as ISingleChoiceQuestionRequestDto);
            case QuestionTypeDto.INPUT_TEXT:
                return new TextInputQuestionRequestDto(question as ITextInputQuestionRequestDto);
            case QuestionTypeDto.CHRONO:
                return new ChronoOrderQuestionRequestDto(question as IChronoOrderQuestionRequestDto);
            case QuestionTypeDto.MULTIPLE:
                return new MultipleChoiceQuestionRequestDto(question as IMultipleChoiceQuestionRequestDto);
            case QuestionTypeDto.CROSSWORD:
                return new CrosswordQuestionRequestDto(question as ICrosswordQuestionRequestDto);
            default:
                throw new Error(`Unknown question type: ${question.questionType}`);
        }
    }

}