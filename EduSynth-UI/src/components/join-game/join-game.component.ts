import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SessionService } from "../../service/session.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-join-game",
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
    templateUrl: "./join-game.component.html",
    styleUrl: "./join-game.component.css"
})
export class JoinGameComponent {

    private readonly sessionService = inject(SessionService);
    private readonly router = inject(Router);

    public formGroup: FormGroup = new FormGroup(
        {
            "gamecode": new FormControl<string>("",
                [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
        });

    public get code() : FormControl<string> { return this.formGroup.get("gamecode") as FormControl<string>; }

    public async onJoinGameClicked(): Promise<void> {
        const session = await this.sessionService.joinSession(this.code.value);
        this.router.navigate(["/session", session.id], {
            state:{ session: session }
        });
    }

}
