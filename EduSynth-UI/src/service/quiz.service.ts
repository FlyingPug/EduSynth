import { inject, Injectable } from "@angular/core";
import { Query } from "../models/common/query";
import { QuizTitleModel } from "../models/quiz/quiz-title-model";
import { Page } from "../models/common/page";
import { ApiClient } from "./api.service";
import { QuizResponseDto } from "../models/quiz/response/quiz-response-model";
import { QuizRequestDto } from "../models/quiz/request/quiz-request-model";

@Injectable({
    providedIn: "root"
})
export class QuizService {

    private apiQuiz: string = "/private/quiz";
    private api = inject(ApiClient);

    public async getQuizTitles(query: Query) : Promise<Page<QuizTitleModel>> {
        const result = await this.api.get<Page<QuizTitleModel>>(
            this.apiQuiz + "/query",
            false,
            null,
            query
        );

        return result;
    }

    public async createQuiz(quiz: QuizRequestDto): Promise<QuizResponseDto> {
        const quizResponse = await this.api.post(this.apiQuiz, quiz);
        return new QuizResponseDto(quizResponse);
    }

    public async getQuiz(id: number) : Promise<QuizResponseDto> {
        const quiz = await this.api.get(this.apiQuiz + `/${id}`);
        return new QuizResponseDto(quiz);
    }

    public async deleteQuiz(id: number) : Promise<void> {
        await this.api.delete(this.apiQuiz + `/${id}`);
    }

}
