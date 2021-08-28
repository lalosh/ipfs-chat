import { AppActionCreator } from "../../types/actions.type";
import { MessageType } from "../reducers/messages.reducer";

export const SEND_MESSAGE = 'SEND_MESSAGE';

export interface SendMessageAction {
    type: typeof SEND_MESSAGE,
    from: string,
    to: string,
    message: string,
    messageType: MessageType
}

export type SendMessageActionCreator = AppActionCreator<SendMessageAction>;

export const sendMessage: SendMessageActionCreator =
    (params) => ({
        type: SEND_MESSAGE,
        ...params,
    });