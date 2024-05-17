import {Quiz} from "../quiz/quiz-model";
import {ParticipantInfo} from "./participant-info";
import {SessionState} from "../enums/session-state";

export interface SessionInfo
{
  quiz: Quiz;
  participants: ParticipantInfo[];
  participantToken: string;
  sessionCode: string;
  sessionState: SessionState;
}
