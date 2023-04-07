import { MessageDto } from "./chat";

export default interface ProxyEventMap
{
    "login": () => void;
    "message": ( channelId: string, message: MessageDto ) => void;
    "conversation": ( channelId: string ) => void;
}
