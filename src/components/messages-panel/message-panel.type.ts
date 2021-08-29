import { MessageObject } from "../../state/reducers/messages.reducer";

export interface MessagesPanelProps {
    selectedFriendId: string,
    myNodeId: string,
    messages: MessageObject[],
}