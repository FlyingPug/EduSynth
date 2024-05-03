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

  constructor(private route: ActivatedRoute,
              private sessionService : SessionService,
              private authService: AuthService,
             ) {}


  public GetLink() : string
  {
    return window.location.href;
  }

  ngOnInit() {
    console.log('WHAT');
    this.sub = this.route.params.subscribe(params => {
      this.code = params['code'];

      this.sessionService.CurrentSession.subscribe((session) =>
      {
        console.log('updating');
        this.session = session;
      })
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
    console.log(name);
    console.log(this.session?.sessionCode);
    console.log(this.session?.participants);
    console.log(this.session?.participants?.find(participant => participant.name == name)?.name);
    return this.session?.participants?.find(participant => participant.name == name)?.leader

  }
}
