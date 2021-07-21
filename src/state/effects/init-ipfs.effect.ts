import { take, call, put, select } from 'redux-saga/effects';
import { INIT_IPFS } from '../actions/init-ipfs';
import IPFS from 'ipfs';
import { setIPFS } from '../actions/set-ipfs';
import { setNodeID } from '../actions/set-node-id';
import { addFriend } from '../actions/add-friend';
import { store } from '../store';
import { RootState } from '../reducers/root.reducer';
import { NODE_ID } from '../../types/node-id.type';
import { receiveMessage } from '../actions/receive-message';

export let MY_IPFS_NODE: any = null;
export const isIPFSReady = () => Boolean(MY_IPFS_NODE);
export const NAMES_WORKSPACE = 'NAMES_WORKSPACE';
export const MESSAGES_WORKSPACE = 'MESSAGES_WORKSPACE';



export function* initIpfsEffect(): any {
    while (true) {
        try {

            yield take(INIT_IPFS);

            MY_IPFS_NODE = yield IPFS.create({
                repo: 'ipfs-' + Math.random(),
                config: {
                    Addresses: {
                        Swarm: [
                            // This is a public webrtc-star server
                            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                            // '/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star'
                        ]
                    },
                    // If you want to connect to the public bootstrap nodes, remove the next line
                    Bootstrap: []
                },
            });

            const nodeID: NODE_ID = yield (MY_IPFS_NODE.id());


            yield put(setNodeID({ nodeID }));


            // get friends names
            yield MY_IPFS_NODE.pubsub.subscribe(NAMES_WORKSPACE, function addFriendHandler(message: any) {
                const friendName = new TextDecoder().decode(message.data);
                const friendId = message.from;

                // we don't want to add ourself to friends map
                if (nodeID?.id != friendId)
                    store.dispatch(addFriend({ friendName, friendId }));
            });


            yield MY_IPFS_NODE.pubsub.subscribe(MESSAGES_WORKSPACE, function receiveMessageHandler(message: any) {
                const data = new TextDecoder().decode(message.data);
                const parsedData: any = JSON.parse(data);
                const from = message.from;

                if (nodeID.id == parsedData.to)
                    store.dispatch(receiveMessage({ from, to: nodeID.id, message: parsedData.message }));
            });



        } catch (error) {
            console.error(error);
        }
    }
}