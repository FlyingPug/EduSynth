import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "../../../service/session.service";
import { SessionInfo } from "../../../models/session/session-info";
import { MatDividerModule } from "@angular/material/divider";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { QrCodeModule } from "ng-qrcode";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../../../service/auth.service";
import { SessionShortInfo } from "../../../models/session/session-short-info";
import { BehaviorSubject } from "rxjs";
import { ParticipantInfo } from "../../../models/session/participant-info";

@Component({
    selector: "app-lobby",
    standalone: true,
    imports: [MatDividerModule, CommonModule, MatListModule, MatIconModule, QrCodeModule, MatButtonModule],
    templateUrl: "./lobby.component.html",
    styleUrl: "./lobby.component.css"
})
export class LobbyComponent implements OnInit {

    private route = inject(ActivatedRoute);
    private sessionService = inject(SessionService);
    private authService = inject(AuthService);

    public session: SessionInfo | null = null;
    public participant: ParticipantInfo;
    public sessionState$: BehaviorSubject<SessionShortInfo | null>;
    private sub: any;
    private code: string = "";

    constructor(
    ) {
        this.sessionState$ = this.sessionService.currentSessionState;
    }

    public GetLink(): string {
        return window.location.href;
    }

    public async ngOnInit(): Promise<void> {
        this.participant = await this.sessionService.getUserParticipant();

        this.sub = this.route.params.subscribe(params => {
            this.code = params["code"];
            this.session = this.sessionService.currentSession;

            this.sessionState$.subscribe(session => {
                console.log("updating", session);
            });
        });
    }

    public async copyLink(): Promise<void> {
        await navigator.clipboard.writeText(this.GetLink());
    }

    public startSession(): void {
        this.sessionService.startSession();
    }

    public isLeader(): boolean | undefined {
        return this.participant.leader;
    }

}
