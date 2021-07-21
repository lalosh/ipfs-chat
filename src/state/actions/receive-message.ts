import { AppActionCreator } from "../../types/actions.type";

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export interface ReceiveMessageAction {
    type: typeof RECEIVE_MESSAGE,
    from: string,
    to: string,
    message: string,
}

export type ReceiveMessageActionCreator = AppActionCreator<ReceiveMessageAction>;

export const receiveMessage: ReceiveMessageActionCreator =
    (params) => ({
        type: RECEIVE_MESSAGE,
        ...params,
    });