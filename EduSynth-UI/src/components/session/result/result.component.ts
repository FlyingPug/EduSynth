import { Component, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { ParticipantInfo } from "../../../models/session/participant-info";
import { SessionService } from "../../../service/session.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-result",
    standalone: true,
    imports: [MatTableModule],
    templateUrl: "./result.component.html",
    styleUrl: "./result.component.css"
})
export class ResultComponent implements OnInit {
    public displayedColumns: string[] = ["name", "score"];
    public dataSource: ParticipantInfo[] = [];
    private code : string = "";

    constructor(private route: ActivatedRoute, private sessionService : SessionService) {}

    public ngOnInit() : void {
        this.route.params.subscribe(params => {
            this.code = params["code"];
            this.getScore();
        });
    }

    private getScore() : void {
        this.sessionService.getResult(this.code).subscribe(sessionResult => {
            this.dataSource = sessionResult.participantDtoList;
        });
    }

}
