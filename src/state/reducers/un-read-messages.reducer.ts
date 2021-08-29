import produce from "immer";
import { IncrementUnReadMessagesCountAction, INCREMENT_UN_READ_MESSAGES_COUNT, ResetUnReadMessagesCountAction, RESET_UN_READ_MESSAGES_COUNT } from "../actions/un-read-message.action";


export interface UnReadMessagesState {
    [friendId: string]: number,
}

const initState: UnReadMessagesState = {};


export const unReadMessageReducer = produce(
    (
        state: UnReadMessagesState,
        action: ResetUnReadMessagesCountAction | IncrementUnReadMessagesCountAction
    ) => {

        switch (action.type) {

            case RESET_UN_READ_MESSAGES_COUNT: {

                state[action.friendId] = 0;

                break;
            }

            case INCREMENT_UN_READ_MESSAGES_COUNT: {

                if (!state[action.friendId]) state[action.friendId] = 0;

                state[action.friendId] = state[action.friendId] + 1;

                break;
            }
        }

    },
    initState
);