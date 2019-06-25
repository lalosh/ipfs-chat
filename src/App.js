import React from 'react';
import ChatApp from './ChatApp';
const App = () => <ChatApp/>;
export default App;

// import IPFS from 'ipfs';
// import BufferPackage from 'buffer';
// const Buffer = BufferPackage.Buffer;

// let node = null;
// const topic = 'global-topic';

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
      // myNodeID: '',
      // peersIDs: [],
      // allMessages: [],
    // }

    // this.sendNewMsg = this.sendNewMsg.bind(this);
    // this.receiveMsg = this.receiveMsg.bind(this);

    // node = new IPFS({
    //   EXPERIMENTAL: { pubsub: true },
    //   repo: (() => `repo-${Math.random()}`)(),
    //   config: {
    //     Addresses: {
    //       Swarm: [
    //         '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
    //       ]
    //     }
    //   }
    // })
  // }

  // componentDidMount() {
  //   node.on('ready', async () => {
  //     let nodeID = await node.id();
  //     // console.log('The Node ID is: ', nodeID.id);
  //     this.setState({ myNodeID: nodeID.id });
  //     // //try to subscribe
  //     node.pubsub.subscribe(topic, this.receiveMsg, (err) => {
  //       if (err) {
  //         return console.error(`failed to subscribe to ${topic}`, err)
  //       }
  //       console.log(`subscribed to ${topic}`)
  //     })
  //   })

  //   //try checking other peers
  //   setInterval(() => {
  //     node.pubsub.peers(topic, (err, peersIDs) => {
  //       if (err) {
  //         return console.error(`failed to get peers subscribed to ${topic}`, err)
  //       }
  //       console.log('my peers idS: ', peersIDs)
  //       this.setState({ peersIDs })
  //     })
  //   }, 5000);
  // }

  // receiveMsg(msg) {
  //   console.log('I received ', msg.data.toString(), ' from ', msg.from);
  //   let msgSplitted = msg.data.toString().split('');
  //   let realName  = msgSplitted[0];
  //   let theMsg = msgSplitted[1];

  //   this.setState(oldState => {
  //     let newMessages = oldState.allMessages.slice();
  //     newMessages.push({ from: realName, data: theMsg });
  //     return {
  //       allMessages: newMessages
  //     }

  //   })
  // }

  // sendNewMsg(newMsg) {
  //   console.log(newMsg);
  //   let myRealName = 'louayalosh';
  //   const msg = Buffer.from(myRealName + ':'+ newMsg)

  //   node.pubsub.publish(topic, msg, (err) => {
  //     if (err) {
  //       return console.error(`failed to publish to ${topic}`, err)
  //     }
  //     // msg was broadcasted
  //     console.log(`published to ${topic}`)
  //   })

  // }
//   render() {
//     return <ChatApp/>
//     );
//   }
// }


// const MyPeers = ({ peersIDs }) => (
//   <div>
//     {
//       peersIDs.length ?
//         peersIDs.map(peerID => (<div key={peerID} className='peer-id'>{peerID.slice(peerID.length - 5)}</div>))
//         : null
//     }
//   </div>
// );

// const MessagesArea = ({ myID, allMessages, sendMsg }) => (
//   <div>
//     <div className='peer-id'>{myID.slice(myID.length - 5)}</div>
//     {
//       allMessages.length ?
//         allMessages.map((msg, index) => (
//           <div className='single-msg' key={String(index)}>
//             <div>{msg.from.slice(msg.from.length - 5)}</div>
//             <div>{msg.data}</div>
//           </div>))
//         : null
//     }
//     <NewMsgInput sendMsg={sendMsg} />
//   </div>
// )

// class NewMsgInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       msgValue: ''
//     }
//   }

//   render() {
//     return (
//       <div className='msg-input'>

//         <input type='text'
//           value={this.state.msgValue}
//           onChange={event => this.setState({ msgValue: event.target.value })}
//         />

//         <button onClick={() => {
//           if (this.state.msgValue) {
//             this.props.sendMsg(this.state.msgValue);
//             this.setState({ msgValue: '' })
//           }
//         }}>send</button>
//       </div>)
//   }
// }









/*

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


    node.on('ready', async () => {
      let nodeID = await node.id();
      console.log('The Node ID is: ', nodeID.id);

      //try to subscribe
      node.pubsub.subscribe(topic, receiveMsg, (err) => {
        if (err) {
          return console.error(`failed to subscribe to ${topic}`, err)
        }
        console.log(`subscribed to ${topic}`)
      });


      //try checking other peers
      setInterval(() => {
        node.pubsub.peers(topic, (err, peersIds) => {
          if (err) {
            return console.error(`failed to get peers subscribed to ${topic}`, err)
          }
          console.log('my peers idS: ', peersIds)
        })
      }, 5000);


      //try publish
      setInterval(() => {
        const msg = Buffer.from('apple ' + Math.random())

        node.pubsub.publish(topic, msg, (err) => {
          if (err) {
            return console.error(`failed to publish to ${topic}`, err)
          }
          // msg was broadcasted
          console.log(`published to ${topic}`)
        })
      }, 6000);
    });
*/
