import { SetSelectedFriendIDActionCreator } from "../../state/actions/set-selected-friend";
import { FriendsState } from "../../state/reducers/friends.reducer";
import {  MessagesState } from "../../state/reducers/messages.reducer";

export interface ContactsListProps {
    friends: FriendsState,

    setSelectedFriendID: SetSelectedFriendIDActionCreator,
    selectedFriendId: string,

    messages: MessagesState,
}