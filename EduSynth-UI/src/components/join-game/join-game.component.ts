import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: "app-join-game",
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
    templateUrl: "./join-game.component.html",
    styleUrl: "./join-game.component.css"
})
export class JoinGameComponent {

    public formGroup: FormGroup = new FormGroup(
        {
            "gamecode": new FormControl<string>("",
                [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
        });

    public get code() : FormControl<string> { return this.formGroup.get("gamecode") as FormControl<string>; }

    onJoinGameClicked() {

    }

}
