import React from 'react';
import './ChatApp.css';
import { Button, Input, Drawer, Icon, notification } from 'antd';
import IPFSChat from './IPFSChat';
import OtherPeers from './OtherPeers';

const { Search } = Input;
let IPFSChatInstance = null;

const openNotification = (sender, msg) => {
  notification.open({
    message: `From ${sender}`,
    description: msg,
    onClick: () => {
      // console.log('Notification Clicked!');
    },
  });
};

class ChatApp extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			visibleDrawer: false,
			makeDrawer: false,
			myName: '',
			myID: '',
			currentMsg: '',
			peers: [],
			selectedPeer: 'global',
			allMessages: {
				'global': []
			}
		}

		this.colseDrawer = this.colseDrawer.bind(this);
		this.changeSelectedPeer = this.changeSelectedPeer.bind(this);
		this.saveMyName = this.saveMyName.bind(this);
		this.scrollDownTheMsgs = this.scrollDownTheMsgs.bind(this);
		this.globalMsgHandler = this.globalMsgHandler.bind(this);
		this.mapNodeIDToName = this.mapNodeIDToName.bind(this);
		this.nameServiceHandler = this.nameServiceHandler.bind(this);
		this.privateChatHandler = this.privateChatHandler.bind(this);

		IPFSChatInstance = new IPFSChat();

		IPFSChatInstance.getID()
			.then(myID => {
				this.setState({ myID });
			})
			.then(() => {
				IPFSChatInstance.newSubscribe('global', this.globalMsgHandler)
				IPFSChatInstance.newSubscribe('name-service', this.nameServiceHandler)
				IPFSChatInstance.newSubscribe('private-chat', this.privateChatHandler)
			});
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions.bind(this));

		try {
			setInterval(async () => {

				let peersComing = await IPFSChatInstance.getPeers('global');

				if (peersComing && peersComing.length) {

					this.setState(oldState => {
						//if i have no peers accept everything
						if (oldState.peers.length == 0)
							return {
								peers: peersComing.map(peerID => ({ name: '', nodeid: peerID }))
							}

						//else i have peers and i am not gonna empty them => adding the new ones olny.
						let existingPeers = oldState.peers.slice();
						let existingPeersIDs = existingPeers.map(peer => peer.nodeid);

						peersComing.forEach(peerID => {
							if (existingPeersIDs.indexOf(peerID) == -1) {
								existingPeers.push({ name: '', nodeid: peerID })
							}
						});

						return {
							peers: existingPeers
						}

					})
				}

			}, 3000);
		} catch (error) {
			console.warn(error);
		}

		setInterval(() => {
			if (this.state.myName) 
				IPFSChatInstance.sendNewMsg('name-service', this.state.myName)
		}, 5000)

	}

	privateChatHandler(msg){
		let senderID = msg.from;
		let data = msg.data.toString();
		let receiverID = data.split(':')[0];
		let theMsg = data.split(':')[1];
		
		const {myID} = this.state;

		// if someone send a message for me
		if(receiverID && theMsg && receiverID == myID){

			this.setState(oldState => {
				let existingAllMessags = Object.assign({}, oldState.allMessages);

				if(!existingAllMessags[senderID]) 
					existingAllMessags[senderID]=[];
			
				let currentDate = new Date();
				let dateString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}    ${currentDate.getHours()}:${currentDate.getMinutes()}`;

				existingAllMessags[senderID].push({
					from: this.mapNodeIDToName(senderID),
					data: theMsg,
					date: dateString,
					mine: false
				});

				openNotification(this.mapNodeIDToName(senderID), theMsg)

				return {allMessages: existingAllMessags};
			});

		}

		// if i'm the sender
		else if(receiverID && theMsg && senderID == myID){


			this.setState(oldState => {
				let existingAllMessags = Object.assign({}, oldState.allMessages);

				if(!existingAllMessags[receiverID]) 
					existingAllMessags[receiverID]=[];
			
				let currentDate = new Date();
				let dateString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}    ${currentDate.getHours()}:${currentDate.getMinutes()}`;

				existingAllMessags[receiverID].push({
					from: this.mapNodeIDToName(receiverID),
					data: theMsg,
					date: dateString,
					mine: true
				});

				return {allMessages: existingAllMessags};
			});

		}
	}
	colseDrawer() {
		this.setState({ visibleDrawer: false })
	}
	updateDimensions() {
		if (window.innerWidth < 500)
			this.setState({ makeDrawer: true });
		else
			this.setState({ makeDrawer: false });
	}
	changeSelectedPeer(peerName) {
		this.setState({ selectedPeer: peerName });
	}
	saveMyName(newName) {
		this.setState({ myName: newName });
	}
	scrollDownTheMsgs(){
		setTimeout(() => {
			let msgContainer = document.getElementsByClassName('msg-container')[0];
			msgContainer.scrollTop = msgContainer.scrollHeight;
		}, 200)
	}
	globalMsgHandler(msg) {
		this.scrollDownTheMsgs();

		this.setState(oldState => {

			let newMessages = Object.assign({}, oldState.allMessages);
			let currentDate = new Date();
			let dateString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}    ${currentDate.getHours()}:${currentDate.getMinutes()}`;

			newMessages['global'].push({
				from: msg.from,
				data: msg.data.toString(),
				date: dateString
			})

			if(msg.from != this.state.myID)
				openNotification(this.mapNodeIDToName(msg.from), msg.data.toString())

			return { allMessages: newMessages }
		})

	}

	nameServiceHandler(msg) {
		let senderID = msg.from;
		let senderName = msg.data.toString();

		this.setState(oldState => {
			let peers = oldState.peers.slice();
			peers.forEach(peer => {
				if (peer.name == '' && peer.nodeid == senderID) {
					peer.name = senderName;
				}
			})
			return { peers }
		});
	}

	mapNodeIDToName(nodeid) {
		let {peers} = this.state;
		for (let i = peers.length - 1; i >= 0; i--) {
			if (peers[i]['nodeid'] == nodeid && peers[i]['name'].length > 0) return peers[i]['name']
		}
		return nodeid;;
	}

	render() {
		const {
			visibleDrawer,
			makeDrawer,
			myName,
			myID,
			currentMsg,
			peers,
			selectedPeer,
			allMessages,
		} = this.state;

		return (<main>

			<aside>

				<h1> My Peers  </h1>

				{makeDrawer ?
					<Drawer
						title="My Peers"
						placement={'left'}
						closable={false}
						onClose={this.colseDrawer}
						visible={visibleDrawer}
					>
						<OtherPeers
							changeSelectedPeer={this.changeSelectedPeer}
							selectedPeer={selectedPeer}
							peers={peers} afterPeerClick={this.colseDrawer} />
					</Drawer>
					:
					<OtherPeers
						changeSelectedPeer={this.changeSelectedPeer}
						selectedPeer={selectedPeer}
						peers={peers} />
				}

			</aside>


			<section>

				<div className='personal-info'>
					<div>

						{
							makeDrawer ?
								<Button
									icon={"unordered-list"}
									onClick={() => this.setState({ visibleDrawer: true })} />
								: null
						}

						<p>ID: ...{myID.slice(myID.length - 5)}</p>

					</div>

					{!myName ?
						<Search
							placeholder="Type your name"
							enterButton="Save"
							onSearch={value => this.saveMyName(value)}
						/>
						:
						<p>{myName}</p>
					}

				</div>

				<div className='msg-container'>
					{
						allMessages[selectedPeer] &&
						allMessages[selectedPeer].length ?
							allMessages[selectedPeer].map((msg, index) => (
								<div
									key={String(msg.from + Math.random())}
									className={msg.from === myID || msg.mine ? 'msg-div my-msg' : 'msg-div'}
								>
									{
										selectedPeer == 'global'?
										msg.from == myID ?
										<h5>{myName || myID.slice(myID.length - 5)}</h5>
										:
										<h5>{this.mapNodeIDToName(msg.from)}</h5>
										:
										null
									}
									<p>{msg.data}</p>
									<h6>{msg.date}</h6>
								</div>
							))
							: null
					}
				</div>

				<div>
					<Search
						autoFocus
						placeholder="Type your message here ..."
						enterButton="Send"
						value={currentMsg}
						onChange={(event) => this.setState({ currentMsg: event.target.value })}
						onSearch={value => {
							if(selectedPeer == 'global')
								IPFSChatInstance.sendNewMsg('global', value);
							else
								IPFSChatInstance.sendNewMsg('private-chat', `${selectedPeer}:${value}`);


							this.setState({ currentMsg: '' });

							this.scrollDownTheMsgs();

						}}
					/>
				</div>

			</section>

		</main>)
	}
}


export default ChatApp;