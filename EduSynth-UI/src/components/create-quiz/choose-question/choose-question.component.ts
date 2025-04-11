import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FormsModule } from "@angular/forms";
import { QuestionTypeDto } from "../../../models/quiz/question-type-model";

@Component({
    selector: "app-choose-question",
    standalone: true,
    imports: [MatButtonModule, MatButtonToggleModule, MatButtonModule, FormsModule],
    templateUrl: "./choose-question.component.html",
    styleUrl: "./choose-question.component.css"
})
export class ChooseQuestionComponent {

    public selectedValue: string = "";

    constructor(
        public dialogRef: MatDialogRef<ChooseQuestionComponent>,
    ) {}

    public onChooseClick(): void {
        this.dialogRef.close(this.selectedValue);
    }

    protected QuestionTypeDto = QuestionTypeDto;

}
