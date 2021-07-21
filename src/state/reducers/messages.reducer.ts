import produce from "immer";
import { Reducer } from "redux";
import { ReceiveMessageAction, RECEIVE_MESSAGE } from "../actions/receive-message";
import { SendMessageAction, SEND_MESSAGE } from "../actions/send-message";

export interface MessageObject {
    timestamp: number,
    message: string,
    authorId: string,
}

export interface MessagesState {
    [friendId: string]: MessageObject[]
}

export type MessagesActions = SendMessageAction | ReceiveMessageAction;

export const messagesReducer: Reducer<MessagesState, MessagesActions> =

    produce((state: MessagesState, action: MessagesActions) => {

        switch (action.type) {

            case SEND_MESSAGE: {

                const { from, to, message } = action;

                if (!state[to]) state[to] = [];

                state[to].push({ message, timestamp: new Date().getTime(), authorId: from });

                break;
            }


            case RECEIVE_MESSAGE: {

                const { from, to, message } = action;

                if (!state[from]) state[from] = [];

                state[from].push({ message, timestamp: new Date().getTime(), authorId: from });

                break;
            }

        }

    }, {});