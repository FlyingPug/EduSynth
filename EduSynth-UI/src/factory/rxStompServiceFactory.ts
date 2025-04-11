import { RxStompConfig } from "@stomp/rx-stomp";
import { RxStompService } from "../service/rx-stomp-service";

export function rxStompServiceFactory(): RxStompService {
    const rxStomp = new RxStompService();

    const location = window.location;
    const protocol = location.protocol === "https:" ? "wss://" : "ws://";
    const host = location.hostname;
    const port = location.port !== "80" ? `:${location.port}` : "";
    const wsUrl = `${protocol}${host}${port}/ws`;

    const myRxStompConfig: RxStompConfig = {
        brokerURL: wsUrl,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
        reconnectDelay: 200,
        debug: (msg: string): void => {
            console.log(new Date(), msg);
        },
    };

    rxStomp.configure(myRxStompConfig);
    rxStomp.activate();
    return rxStomp;
}
