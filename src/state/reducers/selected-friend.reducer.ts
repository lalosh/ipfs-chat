import { SetSelectedFriendIDAction, SET_SELECTED_FRIEND_ID } from "../actions/set-selected-friend";

export function selectedFriendIdReducer(state: string = '', action: SetSelectedFriendIDAction) {

    switch (action.type) {

        case SET_SELECTED_FRIEND_ID:
            return action.friendId;

        default:
            return state;
    }
}