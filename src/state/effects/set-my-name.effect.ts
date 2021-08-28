import { take } from "redux-saga/effects";
import { SetMyNameAction, SET_MY_NAME } from "../actions/set-my-name";
import { MY_IPFS_NODE, NAMES_WORKSPACE } from "./init-ipfs.effect";


export function* setMyNameEffect(): any {

    while (true) {
        try {
            const { name }: SetMyNameAction = yield take(SET_MY_NAME);

            const myName = new TextEncoder().encode(name)

            if (MY_IPFS_NODE)
                yield MY_IPFS_NODE.pubsub.publish(NAMES_WORKSPACE, myName);


            /**
             * to coordinate right between old and new nodes all the time
             * we re-send our name to be saved at other nodes
             */
            setInterval(function reSetMyName() {
                console.log('publishing name...')
                if (MY_IPFS_NODE)
                    MY_IPFS_NODE.pubsub.publish(NAMES_WORKSPACE, myName);
            }, 5000);

        } catch (error) {
            console.error(error);
        }
    }
}