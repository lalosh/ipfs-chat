import { AddFriendAction, ADD_FRIEND } from "../actions/add-friend";

export interface FriendsState {
    [friendId: string]: string
}


export function friendsReducer(state: FriendsState = {}, action: AddFriendAction) {

    switch (action.type) {

        case ADD_FRIEND:
            return {
                ...state,
                [action.friendId]: action.friendName
            }

        default:
            return state;
    }
}