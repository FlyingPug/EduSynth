import {Quiz} from "../quiz-model";
import {ParticipantInfo} from "./participant-info";
import {SessionState} from "../enums/session-state";

export interface SessionInfo
{
  quiz: Quiz;
  participants: ParticipantInfo[];
  participantToken: string;
  sessionState: SessionState;
}
