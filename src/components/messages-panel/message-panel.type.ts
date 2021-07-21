import { SendMessageActionCreator } from "../../state/actions/send-message";
import { MessageObject } from "../../state/reducers/messages.reducer";

export interface MessagesPanelProps {
    selectedFriendId: string,
    myNodeId: string,
    messages: MessageObject[],
}