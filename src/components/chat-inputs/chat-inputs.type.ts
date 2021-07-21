import { SendMessageActionCreator } from "../../state/actions/send-message";

export interface ChatInputsProps {
    sendMessage: SendMessageActionCreator,
    myNodeId: string,
    selectedFriendId: string,
}