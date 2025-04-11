import { BaseModel } from "../../base-model";
import { QuestionTypeDto } from "../question-type-model";
import { ChronoOrderQuestionResponseDto, IChronoOrderQuestionResponseDto } from "./chrono-order-question-response-model";
import { CrosswordQuestionResponseDto, ICrosswordQuestionResponseDto } from "./crossword-question-response-model";
import { MultipleChoiceQuestionResponseDto, IMultipleChoiceQuestionResponseDto } from "./multiple-choise-question-request-model";
import { IQuestionResponseDto, QuestionResponseDto } from "./question-response-model";
import { ISingleChoiceQuestionResponseDto, SingleChoiceQuestionResponseDto } from "./single-choice-question-response-model";
import { TextInputQuestionResponseDto, ITextInputQuestionResponseDto } from "./text-input-question-response-model";

export interface IQuizResponseDto {
    id: number;
    title: string;
    description: string;
    titleMediaUrl: string;
    isPublic: boolean;
    creatorId: number;
    questions: IQuestionResponseDto[];
}

export class QuizResponseDto extends BaseModel {

    public id: number;
    public title: string;
    public description: string;
    public titleMediaUrl: string;
    public isPublic: boolean;
    public creatorId: number;
    public questions: QuestionResponseDto[];

    public constructor(quiz: IQuizResponseDto) {
        super();
        this.mapFromJson(quiz);
        this.questions = quiz.questions?.map(q => this.createQuestion(q)) || [];
    }

    private createQuestion(question: IQuestionResponseDto): QuestionResponseDto {
        switch (question.questionType) {
            case QuestionTypeDto.CHOOSE_OPTION:
                return new SingleChoiceQuestionResponseDto(question as ISingleChoiceQuestionResponseDto);
            case QuestionTypeDto.INPUT_TEXT:
                return new TextInputQuestionResponseDto(question as ITextInputQuestionResponseDto);
            case QuestionTypeDto.CHRONO:
                return new ChronoOrderQuestionResponseDto(question as IChronoOrderQuestionResponseDto);
            case QuestionTypeDto.CHOOSE_MULTIPLE_OPTIONS:
                return new MultipleChoiceQuestionResponseDto(question as IMultipleChoiceQuestionResponseDto);
            case QuestionTypeDto.CROSSWORD:
                return new CrosswordQuestionResponseDto(question as ICrosswordQuestionResponseDto);
            default:
                throw new Error(`Unknown question type: ${question.questionType}`);
        }
    }

}