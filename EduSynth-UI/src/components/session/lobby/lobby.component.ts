import { Component, ElementRef, inject, Input, OnInit, ViewChild } from "@angular/core";
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
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: "app-lobby",
    standalone: true,
    imports: [MatDividerModule, CommonModule, MatListModule, MatIconModule, QrCodeModule, MatButtonModule],
    templateUrl: "./lobby.component.html",
    styleUrl: "./lobby.component.scss"
})
export class LobbyComponent extends BaseComponent implements OnInit {

    private route = inject(ActivatedRoute);
    private sessionService = inject(SessionService);
    private userService = inject(UserService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    @Input() public sessionState$: BehaviorSubject<SessionStateDto | null>;
    @ViewChild("linkInput") public linkInput: ElementRef;

    public participant: ParticipantDto;
    public linkCopied: boolean = false;
    public loading = true;

    public get sessionLink(): string {
        return window.location.href;
    }

    public get isLeader(): boolean | undefined {
        return this.participant?.leader;
    }

    public async ngOnInit(): Promise<void> {
        try {
            const participantDto = await this.getSessionParticipant();

            if (participantDto) {
                this.participant = participantDto;
                this.loading = false;
            } else {
                this.goBack();
            }
        } catch (error) {
            console.error("Ошибка при инициализации лобби:", error);
            this.loading = false;
        }
    }

    public async copyLink(): Promise<void> {
        try {
            await navigator.clipboard.writeText(this.sessionLink);
            this.linkCopied = true;
            setTimeout(() => {
                this.linkCopied = false;
            }, 3000);
        } catch (error) {
            if (this.linkInput) {
                this.linkInput.nativeElement.select();
                this.linkCopied = false;
            }
        }
    }

    public startSession(): void {
        if (this.sessionState$.value) {
            this.sessionService.startSession(this.sessionState$.value.sessionId);
        } else {
            this.snackBar.open("Can't start session at this moment");
        }
    }

    public goBack(): void {
        this.router.navigate(["../"], {
            relativeTo: this.route
        });
    }

    private async getSessionParticipant(): Promise<ParticipantDto | undefined> {
        const user = await this.userService.getCurrentUserInfo();

        return this.sessionState$.value?.participants.find(participant => participant.name == user.username);
    }

    public getInitials(name: string): string {
        if (!name) return "";

        const parts = name.split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }

        return name.substring(0, 2).toUpperCase();
    }

}
