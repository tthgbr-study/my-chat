import { OutgoingPacket, InboxDto, IncomingPacket } from './chat'
import EventProducer from "./EventProducer"
import ProxyEventMap from "./ProxyEventMap"

class Proxy extends EventProducer<ProxyEventMap>
{
    private ws: WebSocket;
    inbox: InboxDto | null = null;

    constructor()
    {
        super();
        this.ws = new WebSocket("wss://raja.aut.bme.hu/chat/");
        this.ws.addEventListener( "open", () => {} );
        this.ws.addEventListener( "message", e =>
        { 
            let p = JSON.parse(e.data) as IncomingPacket;
            switch ( p.type )
            {
                case "error":
                    alert( p.message );
                    break;
                case "login":
                    this.inbox = p.inbox;
                    this.dispatch( "login" );
                    break;
                case "message":
                    let cid = p.channelId;
                    this.inbox!.conversations.find( x => x.channelId === cid )?.lastMessages.push( p.message );
                    this.dispatch("message", cid, p.message);
                    break;
                case "conversationAdded":
                    this.inbox!.conversations.push( p.conversation );
                    this.dispatch("conversation", p.conversation.channelId);
                    break;
            }
        });
    }

    sendPacket(packet: OutgoingPacket)
    {
        this.ws.send(JSON.stringify(packet));
    }

    register(email: string, password: string, name: string) 
    {
        let registerPacket : OutgoingPacket = {type: "register", email: email, password: password, displayName: name, staySignedIn: false };
        //let message = JSON.stringify({ type: "register", email: email, password: password, displayName: name, staySignedIn: false });
        //this.ws.send(message);
        this.sendPacket(registerPacket);
    }

    login(email: string, password: string) {
        //let message = JSON.stringify({ type: "login", email: email, password: password, staySignedIn: false });
        // this.ws.send(message);
        let loginPacket : OutgoingPacket = { type: "login", email: email, password: password, staySignedIn: false };
        this.sendPacket(loginPacket);
    }
}

export var proxy = new Proxy();
