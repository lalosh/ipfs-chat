import { connect } from "react-redux";
import { RootState } from "../../state/reducers/root.reducer";
import { MessagesPanel } from "./messages-panel";

function mapStateToProps(state: RootState) {

    return {
        selectedFriendId: state.selectedFriendId,
        myNodeId: state.nodeID?.id ?? '',
        messages: state.messages?.[state.selectedFriendId] ?? [],
    }

}

const mapActionToProps = {
}

export const MessagePanelContainer = connect(
    mapStateToProps,
    mapActionToProps,
)(
    MessagesPanel
)