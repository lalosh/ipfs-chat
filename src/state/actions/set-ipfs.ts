import { AppActionCreator } from "../../types/actions.type";

export const SET_IPFS = 'SET_IPFS';

export interface SetIPFSAction {
    type: typeof SET_IPFS,
    ipfsNode: any,
}

export type SetIPFSActionCreator = AppActionCreator<SetIPFSAction>;


export const setIPFS: SetIPFSActionCreator =
    (params) => ({
        type: SET_IPFS,
        ...params,
    });