import { AppActionCreator } from "../../types/actions.type";

export const SEND_MESSAGE = 'SEND_MESSAGE';

export interface SendMessageAction {
    type: typeof SEND_MESSAGE,
    from: string,
    to: string,
    message: string,
}

export type SendMessageActionCreator = AppActionCreator<SendMessageAction>;

export const sendMessage: SendMessageActionCreator =
    (params) => ({
        type: SEND_MESSAGE,
        ...params,
    });