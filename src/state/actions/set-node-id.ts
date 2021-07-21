import { AppActionCreator } from "../../types/actions.type";
import { NODE_ID } from "../../types/node-id.type";

export const SET_NODE_ID = 'SET_NODE_ID';

export interface SetNodeIDAction {
    type: typeof SET_NODE_ID,
    nodeID: NODE_ID,
}

export type SetNodeIDActionCreator = AppActionCreator<SetNodeIDAction>;


export const setNodeID: SetNodeIDActionCreator =
    (params) => ({
        type: SET_NODE_ID,
        ...params,
    });