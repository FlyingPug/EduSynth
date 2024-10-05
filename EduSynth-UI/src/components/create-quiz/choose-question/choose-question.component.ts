import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-choose-question',
    standalone: true,
    imports: [MatButtonModule, MatButtonToggleModule, MatButtonModule, FormsModule],
    templateUrl: './choose-question.component.html',
    styleUrl: './choose-question.component.css'
})
export class ChooseQuestionComponent {
    selectedValue: string = '';

    constructor(
        public dialogRef: MatDialogRef<ChooseQuestionComponent>,
    ) {}

    onChooseClick() {
        this.dialogRef.close(this.selectedValue);
    }
}
