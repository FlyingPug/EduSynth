import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: "app-crossword-word-list",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule
    ],
    templateUrl: "./crossword-word-list.component.html",
    styleUrl: "./crossword-word-list.component.scss"
})
export class CrosswordWordListComponent {

    @Input() public words: FormArray;
    @Input() public gridSize: number = 5;

    @Output() public addWord = new EventEmitter<{ word: string, startX: number, startY: number, direction: "horizontal" | "vertical" }>();
    @Output() public removeWord = new EventEmitter<number>();

    public newWordForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.newWordForm = this.fb.group({
            word: ["", [Validators.required, Validators.pattern(/^[а-яА-ЯёЁa-zA-Z]+$/)]],
            startX: [0, [Validators.required, Validators.min(0)]],
            startY: [0, [Validators.required, Validators.min(0)]],
            direction: ["horizontal", Validators.required]
        });
    }

    public onAddWord(): void {
        if (this.newWordForm.valid) {
            const { word, startX, startY, direction } = this.newWordForm.value;

            // Проверяем, что слово помещается в сетку
            if (direction === "horizontal" && startX + word.length > this.gridSize) {
                alert("Слово не помещается в сетку по горизонтали");
                return;
            }

            if (direction === "vertical" && startY + word.length > this.gridSize) {
                alert("Слово не помещается в сетку по вертикали");
                return;
            }

            this.addWord.emit({ word, startX, startY, direction });
            this.newWordForm.reset({ word: "", startX: 0, startY: 0, direction: "horizontal" });
        }
    }

    public onRemoveWord(index: number): void {
        this.removeWord.emit(index);
    }

    public getPositionOptions(): number[] {
        return Array.from({ length: this.gridSize }, (_, i) => i);
    }

}