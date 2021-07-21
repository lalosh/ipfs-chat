import { take } from "redux-saga/effects";
import { SendMessageAction, SEND_MESSAGE } from "../actions/send-message";
import { MESSAGES_WORKSPACE, MY_IPFS_NODE } from "./init-ipfs.effect";

export function* sendMessageEffect(): any {

    while (true) {
        const { from, to, message }: SendMessageAction = yield take(SEND_MESSAGE);

        const data = new TextEncoder().encode(JSON.stringify({
            message,
            to
        }));

        yield MY_IPFS_NODE.pubsub.publish(MESSAGES_WORKSPACE, data)
    }
}