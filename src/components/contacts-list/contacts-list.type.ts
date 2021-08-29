import { SetSelectedFriendIDActionCreator } from "../../state/actions/set-selected-friend";
import { ResetUnReadMessagesCountActionCreator } from "../../state/actions/un-read-message.action";
import { FriendsState } from "../../state/reducers/friends.reducer";
import { MessagesState } from "../../state/reducers/messages.reducer";
import { UnReadMessagesState } from "../../state/reducers/un-read-messages.reducer";

export interface ContactsListProps {
    friends: FriendsState,

    setSelectedFriendID: SetSelectedFriendIDActionCreator,
    selectedFriendId: string,

    messages: MessagesState,

    drawerCloseHandler: () => void,

    unReadMessages: UnReadMessagesState,
    resetUnReadMessagesCount: ResetUnReadMessagesCountActionCreator,
}