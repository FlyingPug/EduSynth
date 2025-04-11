import { Component, inject, OnInit } from "@angular/core";
import { SessionDto } from "../../models/session/session-model";
import { SessionService } from "../../service/session.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { SessionStateDto } from "../../models/session/session-state-model";
import { LobbyComponent } from "./lobby/lobby.component";
import { SessionStatusDto } from "../../models/session/session-status-model";
import { QuestionTypeDto } from "../../models/quiz/question-type-model";
import { ResultComponent } from "./result/result.component";
import { TextInputComponent } from "./questions/input-text-question/text-input.component";
import { CrosswordComponent } from "./questions/crossword-question/crossword.component";
import { ChronoOrderComponent } from "./questions/chrono-order-question/chrono-order.component";
import { SingleChoiceComponent } from "./questions/choose-singe-option-question/single-choice.component";
import { MultipleChoiceComponent } from "./questions/choose-multiple-option-question/multiple-choice.component";
import { SingleChoiceQuestionResponseDto } from "../../models/quiz/response/single-choice-question-response-model";
import { CrosswordQuestionResponseDto } from "../../models/quiz/response/crossword-question-response-model";
import { TextInputQuestionResponseDto } from "../../models/quiz/response/text-input-question-response-model";
import { ChronoOrderQuestionResponseDto } from "../../models/quiz/response/chrono-order-question-response-model";
import { MultipleChoiceQuestionResponseDto } from "../../models/quiz/response/multiple-choise-question-request-model";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-session",
    standalone: true,
    imports: [CommonModule, LobbyComponent, ResultComponent, TextInputComponent, CrosswordComponent, ChronoOrderComponent, SingleChoiceComponent, MultipleChoiceComponent],
    templateUrl: "./session.component.html",
    styleUrl: "./session.component.css"
})
export class SessionComponent implements OnInit {

    private route = inject(ActivatedRoute);
    private sessionService = inject(SessionService);

    public sessionState$ = new BehaviorSubject<SessionStateDto | null>(null);
    public session: SessionDto;
    public code: string = "";
    public loading = false;

    public get singleChoiceQuestion(): SingleChoiceQuestionResponseDto {
        return this.session.quiz.questions[this.sessionState$.value?.currentQuestionIndex ?? 0] as SingleChoiceQuestionResponseDto;
    }

    public get multipleChoiceQuestion(): MultipleChoiceQuestionResponseDto {
        return this.session.quiz.questions[this.sessionState$.value?.currentQuestionIndex ?? 0] as MultipleChoiceQuestionResponseDto;
    }

    public get chronoQuestion(): ChronoOrderQuestionResponseDto {
        return this.session.quiz.questions[this.sessionState$.value?.currentQuestionIndex ?? 0] as ChronoOrderQuestionResponseDto;
    }

    public get textInputQuestion(): TextInputQuestionResponseDto {
        return this.session.quiz.questions[this.sessionState$.value?.currentQuestionIndex ?? 0] as TextInputQuestionResponseDto;
    }

    public get crosswordQuestion(): CrosswordQuestionResponseDto {
        return this.session.quiz.questions[this.sessionState$.value?.currentQuestionIndex ?? 0] as CrosswordQuestionResponseDto;
    }

    public ngOnInit(): void {
        this.loading = true;
        try {
            this.route.params.subscribe(async params => {
                this.code = params["code"];

                this.session = history.state?.data;

                if(!this.session) {
                    this.session = await this.sessionService.joinSession(this.code);
                }

                this.sessionService.watchSession(this.session?.id).subscribe(session => {
                    this.sessionState$.next(session);
                });
            });
        } finally {
            this.loading = false;
        }
    }

    protected SessionStatus = SessionStatusDto;
    protected QuestionTypeDto = QuestionTypeDto;

}
