import { combineReducers } from "redux";
import { friendsReducer } from "./friends.reducer";
import { ipfsNodeReducer } from "./ipfs.reducer";
import { messagesReducer } from "./messages.reducer";
import { myNameReducer } from "./my-name.reducer";
import { nodeIdReducer } from "./node-id.reducer";
import { selectedFriendIdReducer } from "./selected-friend.reducer";

export const rootReducer = combineReducers({
    // ipfsNode: ipfsNodeReducer,
    nodeID: nodeIdReducer,
    myName: myNameReducer,
    friends: friendsReducer,
    selectedFriendId: selectedFriendIdReducer,
    messages: messagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;