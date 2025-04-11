import { QuestionTypeDto } from "../question-type-model";
import { CrosswordCellRequestDto, ICrosswordCellRequestDto } from "./crossword-cell-request-model";
import { IQuestionRequestDto, QuestionRequestDto } from "./question-request-model";

export interface ICrosswordQuestionRequestDto extends IQuestionRequestDto {
    crosswordCells: ICrosswordCellRequestDto[];
}

export class CrosswordQuestionRequestDto extends QuestionRequestDto {

    public crosswordCells: CrosswordCellRequestDto[];

    public constructor(question: ICrosswordQuestionRequestDto) {
        super(question);
        this.crosswordCells = question.crosswordCells?.map(c => new CrosswordCellRequestDto(c)) || [];
    }

    public getQuestionType(): QuestionTypeDto {
        return QuestionTypeDto.CROSSWORD;
    }

}