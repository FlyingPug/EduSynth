import { SessionService } from "../../../service/session.service";
import { Question } from "../../../models/quiz/quiz-question-model";
import { BaseComponent } from "../../base.component";

export abstract class QuestionTemplateComponent extends BaseComponent {

    private readonly question : Question | undefined;

    public get timeLimitSeconds(): number {
        if (this.question?.timeLimitSeconds) return this.question?.timeLimitSeconds;
        return 50;
    }

    public get currentQuestion(): Question | undefined {
        return this.question;
    }

    protected constructor(public sessionService : SessionService) {
        super();
        this.question = this.sessionService.currentQuestion;
    }

}
