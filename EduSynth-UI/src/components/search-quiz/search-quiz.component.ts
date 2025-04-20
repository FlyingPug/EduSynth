import { Component, inject, OnInit } from "@angular/core";
import { QuizService } from "../../service/quiz.service";
import { Query } from "../../models/common/query";
import { QuizTitleModel } from "../../models/quiz/quiz-title-model";
import { ScrollDirectiveDirective } from "../../directives/scroll-directive.directive";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { Page } from "../../models/common/page";
import { SessionService } from "../../service/session.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-search-quiz",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, ScrollDirectiveDirective],
    templateUrl: "./search-quiz.component.html",
    styleUrl: "./search-quiz.component.scss"
})
export class SearchQuizComponent implements OnInit {

    private readonly router = inject(Router);
    private readonly quizService = inject(QuizService);
    private readonly sessionService = inject(SessionService);

    public query: Query = {
        pageNumber: 0,
        pageSize: 10
    };

    public quizArray: QuizTitleModel[] = [];
    public isLoading: boolean = false;
    public currentPage: Page<QuizTitleModel> | null = null;

    private gradients = [
        "linear-gradient(135deg, #6366F1, #8B5CF6)",
        "linear-gradient(135deg, #10B981, #3B82F6)",
        "linear-gradient(135deg, #F59E0B, #EF4444)",
        "linear-gradient(135deg, #EC4899, #8B5CF6)",
        "linear-gradient(135deg, #06B6D4, #3B82F6)",
        "linear-gradient(135deg, #F97316, #F59E0B)"
    ];

    public ngOnInit(): void {
        this.loadQuizzes();
    }

    public scrolledToEndHandler(): void {
        if (!this.isLoading) {
            this.query.pageNumber++;
        } else {
            return;
        }
        this.loadQuizzes();
    }

    private async loadQuizzes(): Promise<void> {
        this.isLoading = true;
        try {
            this.currentPage = await this.quizService.getQuizTitles(this.query);
            this.quizArray.push(...this.currentPage.content);
        } finally {
            this.isLoading = false;
        }
    }

    public async launchTest(id : number): Promise<void> {
        const session = await this.sessionService.createSession(id);
        this.router.navigate(["/session", session.id]);
    }

    public getQuizRows(): QuizTitleModel[][] {
        const rows: QuizTitleModel[][] = [];
        for (let i = 0; i < this.quizArray.length; i += 3) {
            rows.push(this.quizArray.slice(i, i + 3));
        }
        return rows;
    }

    public getRandomGradient(id: number): string {
        const index = id % this.gradients.length;
        return this.gradients[index];
    }

}
