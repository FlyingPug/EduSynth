import { Component, Input, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { ParticipantDto } from "../../../models/session/participant-model";
import { SessionStateDto } from "../../../models/session/session-state-model";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-result",
    standalone: true,
    imports: [MatTableModule],
    templateUrl: "./result.component.html",
    styleUrl: "./result.component.css"
})
export class ResultComponent implements OnInit {

    @Input() public sessionState$ : BehaviorSubject<SessionStateDto | null>;
    public displayedColumns: string[] = ["name", "score"];
    public participants: ParticipantDto[] = [];

    public ngOnInit() : void {
        if(this.sessionState$.value) {
            this.participants = this.sessionState$.value?.participants;
        }
    }

}
