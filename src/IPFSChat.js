import IPFS from 'ipfs';
import BufferPackage from 'buffer';
const Buffer = BufferPackage.Buffer;
let node = null;

function IPFSChat(){
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
	    })
		
	
	function newSubscribe(topicName , receiveMsg){
		node.on('ready', async () => {
      		node.pubsub.subscribe(topicName, receiveMsg, (err) => {
        		if (err) {
		          return console.error(`failed to subscribe to ${topicName}`, err)
		        }
	       		console.log(`subscribed to ${topicName}`)
		    })
	    })
	}

	return{
		newSubscribe,
	}
}

export default IPFSChat;