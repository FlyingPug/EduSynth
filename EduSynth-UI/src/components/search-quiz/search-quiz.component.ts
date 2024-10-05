import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { Query } from '../../models/query';
import { QuizTitleModel } from '../../models/quiz/quiz-title-model';
import { ScrollDirectiveDirective } from '../../directives/scroll-directive.directive';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Page } from '../../models/page';
import { SessionService } from '../../service/session.service';

@Component({
    selector: 'app-search-quiz',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, ScrollDirectiveDirective],
    templateUrl: './search-quiz.component.html',
    styleUrl: './search-quiz.component.css'
})
export class SearchQuizComponent implements OnInit {
    public query: Query = {
        pageNumber: 0,
        pageSize: 10
    };

    public quizArray: QuizTitleModel[] = [];
    public isLoading: boolean = false;
    public currentPage: Page<QuizTitleModel> | null = null;
    constructor(private readonly quizService: QuizService, private  readonly  sessionService: SessionService) {}

    ngOnInit(): void {
        this.loadQuizes();
    }


    public scrolledToEndHandler() {
        if (!this.isLoading) {
            this.query.pageNumber++;
        } else {
            return;
        }
        this.loadQuizes();
    }


    private loadQuizes() {
        this.isLoading = true;
        this.quizService.getQuizTitles(this.query).subscribe((value: Page<QuizTitleModel>) => {
            this.currentPage = value;
            this.quizArray.push(...value.content);
            this.isLoading = false;
        });
    }

    public launchTest(id : number) {
        this.sessionService.createSession(id);
    }
}
