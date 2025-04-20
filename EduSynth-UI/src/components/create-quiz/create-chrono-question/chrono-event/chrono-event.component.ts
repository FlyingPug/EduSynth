import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-chrono-event",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: "./chrono-event.component.html",
    styleUrl: "./chrono-event.component.scss"
})
export class ChronoEventComponent {

    @Input() public formGroup: FormGroup;
    @Input() public index: number;
    @Input() public canRemove: boolean = true;
    @Output() public remove = new EventEmitter<void>();

    public onRemove(): void {
        this.remove.emit();
    }

}