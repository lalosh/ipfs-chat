import { InitIPFSActionCreator } from "../state/actions/init-ipfs";
import { SetMyNameActionCreator } from "../state/actions/set-my-name";

export interface RootComponentProps {
    initIPFS: InitIPFSActionCreator,
    setMyName: SetMyNameActionCreator,
}