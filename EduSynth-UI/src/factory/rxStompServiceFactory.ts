import {RxStompConfig} from "@stomp/rx-stomp";
import {RxStompService} from "../service/rx-stomp-service";
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";


export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();

  let authService = inject(AuthService);
  let location = window.location;
  const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
  const host = location.hostname;
  const port = location.port !== '80' ? `:${location.port}` : '';
  const wsUrl = `${protocol}${host}${port}/ws`;

  const headers =  authService.StompHeader;
  console.log('rxStompServiceFactory начинаю соединение с сервером ws');
  const myRxStompConfig: RxStompConfig = {
    brokerURL: wsUrl,
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 200,
    debug: (msg: string): void => {
      console.log(new Date(), msg);
    },
  };
  console.log('всё');
  rxStomp.configure(myRxStompConfig);
  rxStomp.activate();
  console.log('получилось');
  return rxStomp;
}
