import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { ParticipantDto } from "../../../models/session/participant-model";
import { SessionStateDto } from "../../../models/session/session-state-model";
import { BehaviorSubject, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

interface ConfettiItem {
    left: number;
    delay: number;
    color: string;
  }

@Component({
    selector: "app-result",
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
    templateUrl: "./result.component.html",
    styleUrl: "./result.component.scss"
})
export class ResultComponent implements OnInit, OnDestroy {

    @Input() public sessionState$: BehaviorSubject<SessionStateDto | null>;

    public sortedParticipants: ParticipantDto[] = [];
    public topParticipants: ParticipantDto[] = [];
    public maxScore: number = 0;
    public showConfetti: boolean = true;
    public confettiItems: ConfettiItem[] = [];

    private subscription: Subscription | null = null;

    constructor(private router: Router) {}

    public ngOnInit(): void {
        this.subscription = this.sessionState$.subscribe(state => {
            if (state) {
                this.sortedParticipants = [...state.participants].sort((a, b) => b.score - a.score);
                this.topParticipants = this.sortedParticipants.slice(0, 3);

                this.maxScore = this.sortedParticipants.length > 0 ? this.sortedParticipants[0].score : 0;
                this.generateConfetti();
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public getInitials(name: string): string {
        if (!name) return "";

        const parts = name.split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }

        return name.substring(0, 2).toUpperCase();
    }

    public getScorePercentage(score: number): number {
        if (this.maxScore === 0) return 0;
        return (score / this.maxScore) * 100;
    }

    public playAgain(): void {
        this.router.navigate(["/create-session"]);
    }

    public backToMenu(): void {
        this.router.navigate(["/"]);
    }

    private generateConfetti(): void {
        const colors = ["#FFC107", "#3f51b5", "#4CAF50", "#E91E63", "#00BCD4"];

        this.confettiItems = Array.from({ length: 50 }, () => ({
            left: Math.random() * 100,
            delay: Math.random() * 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
    }

}