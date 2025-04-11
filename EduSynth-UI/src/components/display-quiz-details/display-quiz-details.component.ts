import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { QuizService } from "../../service/quiz.service";
import { CommonModule } from "@angular/common";
import { QuizResponseDto } from "../../models/quiz/response/quiz-response-model";
import { SessionService } from "../../service/session.service";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: "app-display-quiz-details",
    standalone: true,
    imports: [MatCardModule, CommonModule, MatTooltipModule],
    templateUrl: "./display-quiz-details.component.html",
    styleUrl: "./display-quiz-details.component.css"
})
export class DisplayQuizDetailsComponent implements OnInit {

    private quizService = inject(QuizService);
    private sessionService = inject(SessionService);
    private router = inject(Router);

    public quiz: QuizResponseDto | null = null;
    private id: number = 0;

    public async ngOnInit(): Promise<void> {
        this.quiz = await this.quizService.getQuiz(this.id);
    }

    public async launchTest(): Promise<void> {
        if (this.quiz?.id) {
            const session = await this.sessionService.createSession(this.quiz?.id);
            this.router.navigate(["session/" + session.id], {
                state:{ session: session }
            });
        }

    }

}
