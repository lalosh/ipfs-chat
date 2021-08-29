import { InitIPFSActionCreator } from "../state/actions/init-ipfs";
import { SetMyNameActionCreator } from "../state/actions/set-my-name";
import { MessagesState } from "../state/reducers/messages.reducer";

export interface RootComponentProps {
    initIPFS: InitIPFSActionCreator,
    setMyName: SetMyNameActionCreator,
    messages: MessagesState,
}