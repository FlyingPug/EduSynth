import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-crossword-grid",
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: "./crossword-grid.component.html",
    styleUrl: "./crossword-grid.component.scss"
})
export class CrosswordGridComponent {

    @Input() public cells: { x: number, y: number, letter: string, isActive: boolean }[][] = [];
    @Input() public selectedWord: { word: string, startX: number, startY: number, direction: "horizontal" | "vertical" } | null = null;

    @Output() public cellClick = new EventEmitter<{ x: number, y: number }>();

    public onCellClick(x: number, y: number): void {
        this.cellClick.emit({ x, y });
    }

    public isCellInSelectedWord(x: number, y: number): boolean {
        if (!this.selectedWord) return false;

        const { word, startX, startY, direction } = this.selectedWord;

        for (let i = 0; i < word.length; i++) {
            const cellX = direction === "horizontal" ? startX + i : startX;
            const cellY = direction === "vertical" ? startY + i : startY;

            if (x === cellX && y === cellY) {
                return true;
            }
        }

        return false;
    }

}