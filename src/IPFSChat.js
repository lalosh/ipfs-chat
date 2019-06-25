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
	}
}

export default IPFSChat;