import { Quiz } from "../quiz/quiz-model";
import { ParticipantInfo } from "./participant-info";
import { SessionState } from "../enums/session-state";

export interface SessionShortInfo {
    participantDtoList: ParticipantInfo[];
    timeRemainingToNextQuestionSec: number;
    currentQuestionId: number;
    sessionState: SessionState;
}
