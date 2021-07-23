import { SetMyNameActionCreator } from "../../state/actions/set-my-name";

export interface ProfileAndSearchProps {
    setMyName: SetMyNameActionCreator,
    myName: string,
}