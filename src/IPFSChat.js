import IPFS from 'ipfs';
import BufferPackage from 'buffer';
const Buffer = BufferPackage.Buffer;
let node = null;

function IPFSChat() {
    this.ready = false;

    node = new IPFS({
        EXPERIMENTAL: { pubsub: true },
        repo: (() => `repo-${Math.random()}`)(),
        config: {
            Addresses: {
                Swarm: [
                    '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
                ]
            }
        }
    });

    // node.on('ready', async () => {
    //     const version = await node.version()

    //     console.log('Version:', version.version)

    //     const filesAdded = await node.add({
    //         path: 'hello.txt',
    //         content: Buffer.from('Hello World 101 by lalosh')
    //     })

    //     console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
    // })
    async function uploadFile(fileName, fileContent){
    	if(!this.ready) return;

    	  const filesAdded = await node.add({
            path: fileName,
            content: Buffer.from(fileContent)
        });

		  console.log('file link',`https://ipfs.io/ipfs/${filesAdded[0].hash}`)

		return `https://ipfs.io/ipfs/${filesAdded[0].hash}`;
    }
    function getID(callback) {
        return new Promise((resolve, reject) => {

            node.on('ready', async () => {
                let nodeID = await node.id();
                this.ready = true;
                resolve(nodeID.id)
            })

        })
    }

    function newSubscribe(topic, receiveMsg) {
        if (!this.ready) return;

        node.pubsub.subscribe(topic, receiveMsg, (error) => {
            if (error) {
                console.error(`failed to subscribe to ${topic}, ${error}`)
            }
            console.log(`subscribed to ${topic}`)
        })

    }

    function getPeers(topic) {

        return new Promise((resolve, reject) => {
            if (!this.ready) reject('');

            // console.log('looking for peers');

            node.pubsub.peers(topic, (error, peersIDs) => {
                if (error) {
                    reject(`failed to get peers subscribed to ${topic}, ${error}`)
                }
                // console.log('found these peers', peersIDs)
                resolve(peersIDs)
            })

        })
    }


    function sendNewMsg(topic, newMsg) {
    	console.log('sendNewMsg received: ', newMsg)
        const msg = Buffer.from(newMsg)

        node.pubsub.publish(topic, msg, (err) => {
            if (err) {
                return console.error(`failed to publish to ${topic}`, err)
            }
            // msg was broadcasted
            console.log(`published to ${topic}`)
        })
    }

    return {
        newSubscribe,
        getID,
        getPeers,
        sendNewMsg,
        uploadFile
    }
}

export default IPFSChat;