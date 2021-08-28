import produce from "immer";
import { Reducer } from "redux";
import { ReceiveMessageAction, RECEIVE_MESSAGE } from "../actions/receive-message";
import { SendMessageAction, SEND_MESSAGE } from "../actions/send-message";

export type MessageType = 'text' | 'image' | 'voice' | 'video' | 'file';

export interface FileMessageObject {
    cid: string,
    fileType: string,
    fileName: string,
}

export interface MessageObject {
    timestamp: number,
    message: string,
    authorId: string,
    messageType: MessageType,
}

export interface MessagesState {
    [friendId: string]: MessageObject[]
}

export type MessagesActions = SendMessageAction | ReceiveMessageAction;

export const messagesReducer: Reducer<MessagesState, MessagesActions> =

    produce((state: MessagesState, action: MessagesActions) => {

        switch (action.type) {

            case SEND_MESSAGE: {

                const { from, to, message, messageType } = action;

                if (!state[to]) state[to] = [];

                state[to].push({
                    message,
                    timestamp: new Date().getTime(),
                    authorId: from,
                    messageType,
                });

                break;
            }


            case RECEIVE_MESSAGE: {

                const { from, to, message, messageType } = action;

                if (!state[from]) state[from] = [];

                state[from].push({
                    message,
                    timestamp: new Date().getTime(),
                    authorId: from,
                    messageType,
                });

                break;
            }

        }

    }, {});