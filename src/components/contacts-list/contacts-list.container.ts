import { connect } from "react-redux";
import { setSelectedFriendID } from "../../state/actions/set-selected-friend";
import { RootState } from "../../state/reducers/root.reducer";
import { ContactsList } from "./contacts-list";

function mapStateToProps(state: RootState) {

    return {
        friends: state.friends,
        selectedFriendId: state.selectedFriendId,
        messages: state.messages,
    }
}

const mapActionToProps = {
    setSelectedFriendID,
}

export const ContactsListContainer = connect(
    mapStateToProps,
    mapActionToProps,
)(
    ContactsList
)