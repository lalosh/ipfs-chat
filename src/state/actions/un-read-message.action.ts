import { AppActionCreator } from "../../types/actions.type";

export const INCREMENT_UN_READ_MESSAGES_COUNT = 'INCREMENT_UN_READ_MESSAGES_COUNT';

export interface IncrementUnReadMessagesCountAction {
    type: typeof INCREMENT_UN_READ_MESSAGES_COUNT,
    friendId: string,
}

export type IncrementUnReadMessagesCountActionCreator = AppActionCreator<IncrementUnReadMessagesCountAction>;

export const incrementUnReadMessagesCount: IncrementUnReadMessagesCountActionCreator =
    (params) =>
    ({
        type: INCREMENT_UN_READ_MESSAGES_COUNT,
        ...params,
    });

/*****************/

export const RESET_UN_READ_MESSAGES_COUNT = 'RESET_UN_READ_MESSAGES_COUNT';

export interface ResetUnReadMessagesCountAction {
    type: typeof RESET_UN_READ_MESSAGES_COUNT,
    friendId: string,
}

export type ResetUnReadMessagesCountActionCreator = AppActionCreator<ResetUnReadMessagesCountAction>;

export const resetUnReadMessagesCount: ResetUnReadMessagesCountActionCreator =
    (params) =>
    ({
        type: RESET_UN_READ_MESSAGES_COUNT,
        ...params,
    });