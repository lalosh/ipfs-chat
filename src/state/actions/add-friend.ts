import { AppActionCreator } from "../../types/actions.type";

export const ADD_FRIEND = 'ADD_FRIEND';

export interface AddFriendAction {
    type: typeof ADD_FRIEND,
    friendName: string,
    friendId: string,
}

export type AddFriendActionCreator = AppActionCreator<AddFriendAction>;


export const addFriend: AddFriendActionCreator =
    (params) => ({
        type: ADD_FRIEND,
        ...params,
    });