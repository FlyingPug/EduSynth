import { CrosswordCellResponseDto, ICrosswordCellResponseDto } from "./crossword-cell-response-model";
import { IQuestionResponseDto, QuestionResponseDto } from "./question-response-model";

export interface ICrosswordQuestionResponseDto extends IQuestionResponseDto {
    crosswordCells: ICrosswordCellResponseDto[];
}

export class CrosswordQuestionResponseDto extends QuestionResponseDto {

    public crosswordCells: CrosswordCellResponseDto[];

    public constructor(question: ICrosswordQuestionResponseDto) {
        super(question);
        this.crosswordCells = question.crosswordCells?.map(c => new CrosswordCellResponseDto(c)) || [];
    }

}