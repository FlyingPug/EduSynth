import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SessionService} from "../../../service/session.service";
import {SessionInfo} from "../../../models/session/session-info";
import {MatDividerModule} from "@angular/material/divider";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {QrCodeModule} from 'ng-qrcode';
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../service/auth.service";
import {RxStompService} from "../../../service/rx-stomp-service";
import {SessionState} from "../../../models/enums/session-state";
import {SessionShortInfo} from "../../../models/session/session-short-info";
import {BehaviorSubject} from "rxjs";

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
  sessionState$: BehaviorSubject<SessionShortInfo | null>;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private sessionService : SessionService,
              private authService: AuthService,
             )
  {
    this.sessionState$ = this.sessionService.currentSessionState;
  }


  public GetLink() : string
  {
    return window.location.href;
  }

  ngOnInit() {
    console.log('INITIZALIZING LOBBY');
    this.sub = this.route.params.subscribe(params => {
      this.code = params['code'];
      this.session = this.sessionService.currentSession;

      this.sessionState$.subscribe((session) =>
      {
        console.log('updating', session);
      })
    });
  }

  async copyLink() {
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
    console.log(this.session?.participants?.find(participant => participant.name == name)?.name);
    return this.session?.participants?.find(participant => participant.name == name)?.leader
  }
}
