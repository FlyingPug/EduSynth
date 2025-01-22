import { Component, OnInit } from "@angular/core";
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

@Component({
    selector: "app-lobby",
    standalone: true,
    imports: [MatDividerModule, CommonModule, MatListModule, MatIconModule, QrCodeModule, MatButtonModule],
    templateUrl: "./lobby.component.html",
    styleUrl: "./lobby.component.css"
})
export class LobbyComponent implements OnInit {

    public session: SessionInfo | null = null;
    public sessionState$: BehaviorSubject<SessionShortInfo | null>;
    private sub: any;
    private code: string = "";

    constructor(private route: ActivatedRoute,
        private sessionService : SessionService,
        private authService: AuthService,
    ) {
        this.sessionState$ = this.sessionService.currentSessionState;
    }

    public GetLink() : string {
        return window.location.href;
    }

    public ngOnInit() : void {
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
        const name = this.authService.userSubject.getValue().username;
        return this.session?.participants?.find(participant => participant.name == name)?.leader;
    }

}
