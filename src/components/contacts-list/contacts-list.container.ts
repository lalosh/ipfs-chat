import { connect } from "react-redux";
import { setSelectedFriendID } from "../../state/actions/set-selected-friend";
import { resetUnReadMessagesCount } from "../../state/actions/un-read-message.action";
import { RootState } from "../../state/reducers/root.reducer";
import { ContactsList } from "./contacts-list";

function mapStateToProps(state: RootState) {

    return {
        friends: state.friends,
        selectedFriendId: state.selectedFriendId,
        messages: state.messages,
        unReadMessages: state.unReadMessage,
    }
}

const mapActionToProps = {
    setSelectedFriendID,
    resetUnReadMessagesCount,
}

export const ContactsListContainer = connect(
    mapStateToProps,
    mapActionToProps,
)(
    ContactsList
)