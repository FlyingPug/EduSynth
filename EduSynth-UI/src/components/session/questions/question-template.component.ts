import { Component, Injectable } from '@angular/core';
import { SessionService } from '../../../service/session.service';
import { CommonModule } from '@angular/common';
import { Question } from '../../../models/quiz/quiz-question-model';
import { CountdownConfig } from 'ngx-countdown';

export abstract class QuestionTemplateComponent {

    private readonly question : Question | undefined;

    public get TimeLimitSeconds() {
        if (this.question?.timeLimitSeconds) return this.question?.timeLimitSeconds;
        return 50;
    }

    public get currentQuestion() {
        return this.question;
    }

    protected constructor(public sessionService : SessionService) {
        this.question = this.sessionService.currentQuestion;
        console.log('current question 2 is ', this.question);
    }
}
