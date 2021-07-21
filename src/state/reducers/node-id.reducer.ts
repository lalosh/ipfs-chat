import { NODE_ID } from "../../types/node-id.type";
import { SetNodeIDAction, SET_NODE_ID } from "../actions/set-node-id";

export function nodeIdReducer(state: NODE_ID | null = null, action: SetNodeIDAction) {

    switch (action.type) {
        case SET_NODE_ID:
            return action.nodeID;

        default:
            return state;
    }
}