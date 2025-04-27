import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { BaseQuestionComponent } from "../base-question.component";
import { CommonModule } from "@angular/common";
import { CrosswordQuestionResponseDto } from "../../../../models/quiz/response/crossword-question-response-model";
import { MatIconModule } from "@angular/material/icon";
import { CircleTimerComponent } from "../../../circle-timer/circle-timer.component";

@Component({
    selector: "app-crossword-question ",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        CircleTimerComponent
    ],
    templateUrl: "./crossword.component.html",
    styleUrls: ["./crossword.component.scss"]
})
export class CrosswordComponent extends BaseQuestionComponent<CrosswordQuestionResponseDto> implements AfterViewInit, OnInit {

    @ViewChild("timer") public timer: CircleTimerComponent;

    public grid: (CrosswordCell | null)[][] = [];
    public cells: CrosswordCell[] = [];
    public maxX = 0;
    public maxY = 0;
    public currentFocus: {x: number, y: number} | null = null;
    public isMobile = false;
    public showCoordinates = false;
    public timeRemaining = 0;
    public timeWarning = false;

    public ngOnInit(): void {
        this.timeLimitSeconds = this.question.timeLimitSeconds || 60;
        this.timeRemaining = this.timeLimitSeconds;
        this.checkMobile();
        this.initializeForm();
    }

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.timer.start();
            this.focusFirstCell();
        }, this.isMobile ? 300 : 100);
    }

    @HostListener("window:resize")
    public onResize(): void {
        this.checkMobile();
    }

    private checkMobile(): void {
        this.isMobile = window.innerWidth < 768;
    }

    protected initializeForm(): void {
        const crossword = this.question as CrosswordQuestionResponseDto;

        // Find grid dimensions
        this.maxX = Math.max(...crossword.crosswordCells.map(c => c.positionX));
        this.maxY = Math.max(...crossword.crosswordCells.map(c => c.positionY));

        // Initialize grid
        this.grid = Array(this.maxY + 1).fill(null)
            .map(() => Array(this.maxX + 1).fill(null));

        // Create cells and place them in grid
        this.cells = crossword.crosswordCells.map(cell => {
            const control = new FormControl<string>("", { nonNullable: true });

            const crosswordCell: CrosswordCell = {
                id: cell.id,
                x: cell.positionX,
                y: cell.positionY,
                length: cell.length || 1,
                control: control
            };

            this.grid[cell.positionY][cell.positionX] = crosswordCell;
            return crosswordCell;
        });
    }

    public onTimerComplete(): void {
        // Автоматически отправляем ответы при истечении времени
        this.submit();
    }

    public onTimerTick(seconds: number): void {
        this.timeRemaining = seconds;

        // Можно добавить дополнительную логику для предупреждений
        if (seconds <= 10 && !this.timeWarning) {
            this.timeWarning = true;
            // Здесь можно добавить звуковое предупреждение или другую логику
        }
    }

    public focusFirstCell(): void {
        if (this.cells.length > 0) {
            this.focusCell(this.cells[0].x, this.cells[0].y);
        }
    }

    public focusCell(x: number, y: number): void {
        this.currentFocus = { x, y };
        this.highlightConnectedCells(x, y);

        setTimeout(() => {
            const input = document.getElementById(`cell-${x}-${y}`) as HTMLInputElement;
            if (this.isMobile) {
                input?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }
            input?.focus();
        }, this.isMobile ? 100 : 0);
    }

    public highlightConnectedCells(x: number, y: number): void {
        // Reset all highlights
        this.cells.forEach(cell => cell.isHighlighted = false);

        // Highlight current cell and connected cells in row and column
        const currentCell = this.grid[y][x];
        if (!currentCell) return;

        // Highlight row
        for (let i = 0; i <= this.maxX; i++) {
            const cell = this.grid[y][i];
            if (cell) cell.isHighlighted = true;
        }

        // Highlight column
        for (let i = 0; i <= this.maxY; i++) {
            const cell = this.grid[i][x];
            if (cell) cell.isHighlighted = true;
        }
    }

    public onCellKeydown(event: KeyboardEvent, cell: CrosswordCell): void {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            this.handleArrowNavigation(event.key, cell);
            event.preventDefault();
        } else if (event.key === "Backspace" && !cell.control.value) {
            // Если ячейка пуста и нажат Backspace, перейти к предыдущей ячейке
            this.handleArrowNavigation("ArrowLeft", cell);
            event.preventDefault();
        }
    }

    public onCellInput(event: Event, x: number, y: number): void {
        const input = event.target as HTMLInputElement;

        if (input.value.length === input.maxLength) {
            this.handleArrowNavigation("ArrowRight", this.grid[y][x]!);
        }
    }

    public handleArrowNavigation(key: string, currentCell: CrosswordCell): void {
        let newX = currentCell.x;
        let newY = currentCell.y;

        switch (key) {
            case "ArrowUp":
                newY = Math.max(0, currentCell.y - 1);
                break;
            case "ArrowDown":
                newY = Math.min(this.maxY, currentCell.y + 1);
                break;
            case "ArrowLeft":
                newX = Math.max(0, currentCell.x - 1);
                break;
            case "ArrowRight":
                newX = Math.min(this.maxX, currentCell.x + 1);
                break;
        }

        // Find next non-null cell in direction
        while (newX >= 0 && newX <= this.maxX && newY >= 0 && newY <= this.maxY) {
            if (this.grid[newY][newX] !== null) {
                this.focusCell(newX, newY);
                return;
            }

            // Move further in the same direction
            switch (key) {
                case "ArrowUp": newY--; break;
                case "ArrowDown": newY++; break;
                case "ArrowLeft": newX--; break;
                case "ArrowRight": newX++; break;
            }
        }
    }

    public navigateDirection(direction: string): void {
        if (this.currentFocus) {
            const currentCell = this.grid[this.currentFocus.y][this.currentFocus.x];
            if (currentCell) {
                this.handleArrowNavigation(direction, currentCell);
            }
        }
    }

    public clearCrossword(): void {
        this.cells.forEach(cell => cell.control.setValue(""));
        this.focusFirstCell();
    }

    public isFormValid(): boolean {
        return this.cells.every(cell => cell.control.value.trim().length > 0);
    }

    public submit(): void {
        this.timer.stop();

        const answers = this.cells.map(cell => ({
            answerId: cell.id,
            answer: cell.control.value,
            positionX: cell.x,
            positionY: cell.y
        }));

        this.submitAnswers(answers);
    }

}

interface CrosswordCell {
    id: number;
    x: number;
    y: number;
    length: number;
    control: FormControl<string>;
    correct?: boolean;
    isHighlighted?: boolean;
}