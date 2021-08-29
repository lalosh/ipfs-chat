import { InitIPFSActionCreator } from "../state/actions/init-ipfs";
import { MessagesState } from "../state/reducers/messages.reducer";

export interface RootComponentProps {
    initIPFS: InitIPFSActionCreator,
    messages: MessagesState,
}