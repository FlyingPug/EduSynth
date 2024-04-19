import { Component } from '@angular/core';
import {Quiz} from "../../../models/quiz-model";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../service/quiz.service";
import {SessionService} from "../../../service/session.service";
import {SessionInfo} from "../../../models/session/session-info";
import {MatDividerModule} from "@angular/material/divider";
import {CommonModule} from "@angular/common";
import {MatListModule, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatSubheaderHarness} from "@angular/material/list/testing";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import { QrCodeModule } from 'ng-qrcode';
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MatDividerModule, CommonModule, MatListModule, MatIconModule, QrCodeModule, MatButtonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
  code: string = '';
  session: SessionInfo | null = null;
  private sub: any;

  constructor(private route: ActivatedRoute, private sessionService : SessionService, private authService: AuthService) {}


  public GetLink() : string
  {
    return window.location.href;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.code = params['code'];

      if(this.sessionService.CurrentSession == null) {
        this.sessionService.joinSession(this.code)
      }
    });
  }

  async CopyLink() {
    try {
      await navigator.clipboard.writeText(this.GetLink());
    }
    catch (e)
    {
      if(e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  StartSession() {
    this.sessionService.startSession();
  }

  IsLeader() {
    let name = this.authService.userSubject.getValue().username;
    return this.session?.participants?.find(participant => participant.name == name)?.isLeader
  }
}
