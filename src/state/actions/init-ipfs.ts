import { AppActionCreator } from "../../types/actions.type";

export const INIT_IPFS = 'INIT_IPFS';

export interface InitIPFSAction {
    type: typeof INIT_IPFS,
}

export type InitIPFSActionCreator = AppActionCreator<InitIPFSAction>;


export const initIPFS: InitIPFSActionCreator =
    (params) => ({
        type: INIT_IPFS,
        ...params,
    });