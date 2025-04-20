import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";

import { QuestionCreator } from "../question-creator";
import { CrosswordGridComponent } from "./crossword-grid/crossword-grid.component";
import { CrosswordWordListComponent } from "./crossword-word-list/crossword-word-list.component";
import { slideToLeftAnimation } from "../../../animations/slide-to-left";
import { ImageUploadComponent } from "../../image-upload/image-upload.component";
import { IQuizRequestDto, QuizRequestDto } from "../../../models/quiz/request/quiz-request-model";
import { QuizService } from "../../../service/quiz.service";
import { ChooseQuestionComponent } from "../choose-question/choose-question.component";
import { QuestionTypeDto } from "../../../models/quiz/question-type-model";
import { CrosswordQuestionRequestDto } from "../../../models/quiz/request/crossword-question-request-model";

@Component({
    selector: "app-create-crossword-question",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTabsModule,
        ImageUploadComponent,
        CrosswordGridComponent,
        CrosswordWordListComponent,
        FormsModule
    ],
    templateUrl: "./create-crossword-question.component.html",
    styleUrl: "./create-crossword-question.component.scss",
    animations: [slideToLeftAnimation]
})
export class CreateCrosswordQuestionComponent extends QuestionCreator implements OnInit {

    public form = this.fb.group({
        "questionText": new FormControl<string>("",
            [Validators.required, Validators.maxLength(364), Validators.minLength(1)]),
        "timeLimit": new FormControl<number>(300, [Validators.min(5)]),
        "gridSize": new FormControl<number>(5, [Validators.min(3), Validators.max(10)]),
        words: this.fb.array([])
    });

    public activeTabIndex: number = 0;
    public questionImageUrl: string = "";
    public crosswordCells: { x: number, y: number, letter: string, isActive: boolean }[][] = [];
    public selectedWord: {
        word: string,
        startX: number,
        startY: number,
        direction: "horizontal" | "vertical",
        index?: number
    } | null = null;

    @ViewChild(CrosswordWordListComponent) public wordListComponent: CrosswordWordListComponent;

    public get newWordForm(): FormGroup | null {
        return this.wordListComponent?.newWordForm || null;
    }

    public get words(): FormArray {
        return this.form.controls.words as FormArray;
    }

    public get questionText(): FormControl<string> {
        return this.getFormControl(this.form, "questionText");
    }

    public get timeLimit(): FormControl<number> {
        return this.getFormControl(this.form, "timeLimit");
    }

    public get gridSize(): FormControl<number> {
        return this.getFormControl(this.form, "gridSize");
    }

    private quizRequest: IQuizRequestDto;

    constructor(fb: FormBuilder, quizService: QuizService, router: Router, dialog: MatDialog, route: ActivatedRoute) {
        super(fb, quizService, router, dialog, route);
    }

    public ngOnInit(): void {
        this.quizRequest = history.state?.quizRequest;

        if (!this.quizRequest) {
            this.router.navigate(["../"], {
                relativeTo: this.route
            });
        }

        this.initCrosswordGrid();

        // Слушаем изменения размера сетки
        this.gridSize.valueChanges.subscribe(size => {
            if (size) {
                this.initCrosswordGrid(size);
            }
        });
    }

    private initCrosswordGrid(size: number = 5): void {
        this.crosswordCells = [];
        for (let y = 0; y < size; y++) {
            const row: { x: number, y: number, letter: string, isActive: boolean }[] = [];
            for (let x = 0; x < size; x++) {
                row.push({ x, y, letter: "", isActive: false });
            }
            this.crosswordCells.push(row);
        }
    }

    public override addQuestion(): void {
        const dialogRef = this.dialog.open(ChooseQuestionComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.addQuestionToQuiz();

            if (result in QuestionTypeDto){
                this.router.navigate(["../" + result], {
                    relativeTo: this.route,
                    state:{ quizRequest: this.quizRequest }
                });
            }
        });
    }

    public override async onCreateQuizClick(): Promise<void> {
        this.addQuestionToQuiz();
        const quiz = new QuizRequestDto(this.quizRequest);
        const quizResponse = await this.quizService.createQuiz(quiz);

        this.router.navigate(["quiz/" + quizResponse.id], {
            state:{ quizRequest: this.quizRequest }
        });
    }

    private addQuestionToQuiz(): void {
        // Собираем все активные ячейки кроссворда
        const crosswordCells: { correctText: string, positionX: number, positionY: number }[] = [];

        for (let y = 0; y < this.crosswordCells.length; y++) {
            for (let x = 0; x < this.crosswordCells[y].length; x++) {
                const cell = this.crosswordCells[y][x];
                if (cell.isActive && cell.letter) {
                    crosswordCells.push({
                        correctText: cell.letter,
                        positionX: x,
                        positionY: y
                    });
                }
            }
        }

        this.quizRequest.questions.push(new CrosswordQuestionRequestDto({
            text: this.questionText?.value,
            mediaUrl: this.questionImageUrl,
            questionType: QuestionTypeDto.CROSSWORD,
            timeLimitSeconds: this.timeLimit?.value,
            crosswordCells: crosswordCells,
        }));
    }

    public addWord(word: string, startX: number, startY: number, direction: "horizontal" | "vertical"): void {
        if (!word || word.length === 0) return;

        // Проверяем, что слово помещается в сетку
        if (direction === "horizontal" && startX + word.length > this.crosswordCells[0].length) return;
        if (direction === "vertical" && startY + word.length > this.crosswordCells.length) return;

        // Добавляем слово в сетку
        for (let i = 0; i < word.length; i++) {
            const x = direction === "horizontal" ? startX + i : startX;
            const y = direction === "vertical" ? startY + i : startY;

            this.crosswordCells[y][x].letter = word[i].toUpperCase();
            this.crosswordCells[y][x].isActive = true;
        }

        // Добавляем слово в список слов
        const wordForm = this.fb.group({
            word: [word, [Validators.required]],
            startX: [startX],
            startY: [startY],
            direction: [direction]
        });

        this.words.push(wordForm);
    }

    public removeWord(index: number): void {
        const wordForm = this.words.at(index);
        const word = wordForm.get("word")?.value;
        const startX = wordForm.get("startX")?.value;
        const startY = wordForm.get("startY")?.value;
        const direction = wordForm.get("direction")?.value;

        // Удаляем слово из сетки
        for (let i = 0; i < word.length; i++) {
            const x = direction === "horizontal" ? startX + i : startX;
            const y = direction === "vertical" ? startY + i : startY;

            // Проверяем, не является ли ячейка частью другого слова
            let isPartOfAnotherWord = false;
            for (let j = 0; j < this.words.length; j++) {
                if (j === index) continue;

                const otherWord = this.words.at(j).get("word")?.value;
                const otherStartX = this.words.at(j).get("startX")?.value;
                const otherStartY = this.words.at(j).get("startY")?.value;
                const otherDirection = this.words.at(j).get("direction")?.value;

                for (let k = 0; k < otherWord.length; k++) {
                    const otherX = otherDirection === "horizontal" ? otherStartX + k : otherStartX;
                    const otherY = otherDirection === "vertical" ? otherStartY + k : otherStartY;

                    if (x === otherX && y === otherY) {
                        isPartOfAnotherWord = true;
                        break;
                    }
                }

                if (isPartOfAnotherWord) break;
            }

            if (!isPartOfAnotherWord) {
                this.crosswordCells[y][x].letter = "";
                this.crosswordCells[y][x].isActive = false;
            }
        }

        this.words.removeAt(index);
    }

    public onTitleImageUrlGet($event: string): void {
        this.questionImageUrl = $event;
    }

    public onCellClick(cell: { x: number, y: number }): void {
        const { x, y } = cell;

        let foundWord = null;

        for (let i = 0; i < this.words.length; i++) {
            const wordForm = this.words.at(i);
            const word = wordForm.get("word")?.value;
            const startX = wordForm.get("startX")?.value;
            const startY = wordForm.get("startY")?.value;
            const direction = wordForm.get("direction")?.value;

            for (let j = 0; j < word.length; j++) {
                const wordX = direction === "horizontal" ? startX + j : startX;
                const wordY = direction === "vertical" ? startY + j : startY;

                if (x === wordX && y === wordY) {
                    foundWord = {
                        word: word,
                        startX: startX,
                        startY: startY,
                        direction: direction,
                        index: i
                    };
                    break;
                }
            }

            if (foundWord) break;
        }

        if (foundWord) {
            this.selectedWord = foundWord;
        } else if (this.crosswordCells[y][x].isActive) {
            this.selectedWord = null;
        } else {
            this.selectedWord = null;
            const wordForm = this.newWordForm;
            if (wordForm) {
                wordForm.patchValue({
                    startX: x,
                    startY: y
                });

                // Переключаемся на вкладку со списком слов
                this.activeTabIndex = 1; // Предполагаем, что вкладка со списком слов имеет индекс 1
            }
        }
    }

}