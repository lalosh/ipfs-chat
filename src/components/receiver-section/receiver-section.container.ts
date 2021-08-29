import { connect } from "react-redux";
import { RootState } from "../../state/reducers/root.reducer";
import { ReceiverSection } from "./receiver-section";
import moment from 'moment';

function mapStateToProps(state: RootState) {

    const friendsMessages = state.messages?.[state.selectedFriendId] ?? [];
    const lastMessageIndex = friendsMessages?.length - 1;

    const lastMessage = friendsMessages[lastMessageIndex];
    let lastSeen = '';

    if (lastMessage) {
        const lastMessageTimestamp = lastMessage?.timestamp ?? '';
        lastSeen = moment(lastMessageTimestamp).format('hh:mm A');
    }

    return {
        receiverName: state.friends?.[state.selectedFriendId] ?? '',
        lastSeen,
    }
}

const mapActionsToProps = {}

export const ReceiverSectionContainer = connect(
    mapStateToProps,
    mapActionsToProps,
)(
    ReceiverSection
)