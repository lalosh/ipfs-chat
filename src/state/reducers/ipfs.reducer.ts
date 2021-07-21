import { SetIPFSAction, SET_IPFS } from "../actions/set-ipfs";

export function ipfsNodeReducer(state: any = {}, action: SetIPFSAction) {

    switch (action.type) {

        case SET_IPFS: {
            return action.ipfsNode;
        }

        default:
            return state;
    }

}