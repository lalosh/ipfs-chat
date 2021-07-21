import { connect } from "react-redux";
import { sendMessage } from "../../state/actions/send-message";
import { RootState } from "../../state/reducers/root.reducer";
import { ChatsInputs } from "./chat-inputs";

function mapStateToProps(state: RootState) {

    return {
        myNodeId: state.nodeID?.id ?? '',
        selectedFriendId: state.selectedFriendId,
    }
}

const mapActionsToProps = {
    sendMessage
}

export const ChatInputsContainer = connect(
    mapStateToProps,
    mapActionsToProps
)(
    ChatsInputs,
)