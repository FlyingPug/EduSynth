import { Component, inject, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../service/session.service";
import { MatDividerModule } from "@angular/material/divider";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { QrCodeModule } from "ng-qrcode";
import { MatButtonModule } from "@angular/material/button";
import { BehaviorSubject } from "rxjs";
import { ParticipantDto } from "../../../models/session/participant-model";
import { UserService } from "../../../service/user.service";
import { BaseComponent } from "../../base.component";
import { SessionStateDto } from "../../../models/session/session-state-model";

@Component({
    selector: "app-lobby",
    standalone: true,
    imports: [MatDividerModule, CommonModule, MatListModule, MatIconModule, QrCodeModule, MatButtonModule],
    templateUrl: "./lobby.component.html",
    styleUrl: "./lobby.component.css"
})
export class LobbyComponent extends BaseComponent implements OnInit {

    private route = inject(ActivatedRoute);
    private sessionService = inject(SessionService);
    private userService = inject(UserService);
    private router = inject(Router);

    @Input() public sessionState$ : BehaviorSubject<SessionStateDto | null>;

    public participant: ParticipantDto;

    private code: string = "";
    public loading = false;

    public get sessionLink(): string {
        return window.location.href;
    }

    public get isLeader(): boolean | undefined {
        return this.participant.leader;
    }

    public async ngOnInit(): Promise<void> {

        const participantDto = await this.getSessionParticipant();

        if (participantDto) {
            this.participant = participantDto;
        } else {
            this.goBack();
        }
    }

    public async copyLink(): Promise<void> {
        await navigator.clipboard.writeText(this.sessionLink);
    }

    public startSession(): void {
        this.sessionService.startSession(this.code);
    }

    private goBack(): void {
        this.router.navigate(["../"], {
            relativeTo: this.route
        });
    }

    private async getSessionParticipant(): Promise<ParticipantDto | undefined> {
        const user = await this.userService.getCurrentUserInfo();

        return this.sessionState$.value?.participants.find(participant => participant.name == user.username);
    }

}
