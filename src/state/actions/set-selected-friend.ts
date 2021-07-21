import { AppActionCreator } from "../../types/actions.type";
import { NODE_ID } from "../../types/node-id.type";

export const SET_SELECTED_FRIEND_ID = 'SET_SELECTED_FRIEND_ID';

export interface SetSelectedFriendIDAction {
    type: typeof SET_SELECTED_FRIEND_ID,
    friendId: string,
}

export type SetSelectedFriendIDActionCreator = AppActionCreator<SetSelectedFriendIDAction>;


export const setSelectedFriendID: SetSelectedFriendIDActionCreator =
    (params) => ({
        type: SET_SELECTED_FRIEND_ID,
        ...params,
    });