import React, { Fragment } from 'react';
import './ChatApp.css';
import { Button, Input, Drawer, Icon } from 'antd';
import IPFSChat from './IPFSChat.js';
const { Search } = Input;
let IPFSChatInstance = null;

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleDrawer: false,
            makeDrawer: false,
            myName: '',
            myID: '',
            currentMsg: '',
            peers: [
                // { name: 'global', nodeid: 'jalifjalifj1' },
                // { name: 'anas', nodeid: 'jalifjalifj2' },
                // { name: 'moied', nodeid: 'jalifjalifj3' },
                // { name: 'mam', nodeid: 'jalifjalifj4' },
                // { name: '', nodeid: 'jalifjalifj5' },
            ],
            selectedPeer: 'global',
            allMessages: {
                'global': [
                    // { from: 'anas', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                    // { from: 'memo', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                    // { from: 'omar', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                    // { from: 'mam', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                ]
            }
        }

        this.colseDrawer = this.colseDrawer.bind(this);
        this.changeSelectedPeer = this.changeSelectedPeer.bind(this);
        this.saveMyName = this.saveMyName.bind(this);
        this.sendNewMessage = this.sendNewMessage.bind(this);
        this.changeMyID = this.changeMyID.bind(this);
        this.handleNewPeers = this.handleNewPeers.bind(this);
        this.receiveNewMsg = this.receiveNewMsg.bind(this);
        this.mapNodeIDToName = this.mapNodeIDToName.bind(this);
        this.handleNameComing = this.handleNameComing.bind(this);

        IPFSChatInstance = new IPFSChat();


        IPFSChatInstance.getID()
            .then(myID => {
                this.setState({ myID });
            })
            .then(() => {
                IPFSChatInstance.newSubscribe('global', this.receiveNewMsg)
				        IPFSChatInstance.newSubscribe('name-service', this.handleNameComing)
            }); 
    }

    changeMyID(id) {
        this.setState({ myID: id });
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
    sendNewMessage(msg) {
        console.log('the msg', msg, 'has been sent fakly for now!');
    }
    receiveNewMsg(msg) {
        console.log('we have got this grate msg', msg.data.toString(), 'from', msg.from);
									setTimeout(()=>{
										let msgContainer = document.getElementsByClassName('msg-container')[0];
										msgContainer.scrollTop = msgContainer.scrollHeight;
									}, 200)
									
        this.setState(oldState => {

            let newMessages = Object.assign({}, oldState.allMessages);
            let currentDate = new Date();
            let dateString = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

            newMessages['global'].push({
                from: msg.from,
                data: msg.data.toString(),
                date: dateString
            })

            return { allMessages: newMessages }
        })

    }
    
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));


        try {
            setInterval(async () => {

                let peersComing = await IPFSChatInstance.getPeers('global')
                if (peersComing && peersComing.length) {
                    // peersComing = peersComing.map(peer => ({ name: '', nodeid: peer }));

                    this.setState(oldState => {
                    	if(oldState.peers.length == 0) 
                    		return {
                    			peers: peersComing.map(peerID => ({name: '', nodeid: peerID}))
                    		}

                    		
                    	let existingPeers = oldState.peers.slice();
                    	let existingPeersIDs = existingPeers.map(peer=>peer.nodeid);

                    	peersComing.forEach(peerID=>{
                    		if(existingPeersIDs.indexOf(peerID) == -1){
                    			existingPeers.push({name: '', nodeid: peerID})
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

        setInterval(()=>{
        	if(this.state.myName){
        		IPFSChatInstance.sendNewMsg('name-service', this.state.myName)
        	}
        },5000)

    }
    handleNameComing(msg){
    	let senderID = msg.from;
    	let senderName = msg.data.toString();
    	console.warn('new name coming', senderName, senderID);

    	this.setState(oldState => {
    		let peers = oldState.peers.slice();
    		peers.forEach(peer => {
    			if(peer.name == '' && peer.nodeid == senderID){
    				peer.name = senderName;
    			}
    		})
    		return {peers}
    	});
    }
    mapNodeIDToName(nodeid){
    	let peers = this.state.peers;
    	for (let i = peers.length - 1; i >= 0; i--) {
    		if(peers[i]['nodeid'] == nodeid && peers[i]['name'].length > 0) return peers[i]['name']
    	}
    	return nodeid.slice(nodeid.length - 5 );
    }
    handleNewPeers(peers) {

    }
    render() {
        return (
            <Fragment>

				<main>

					<aside>

						<h1> My Peers {this.state.selectedPeer.slice(this.state.selectedPeer.length - 5)} </h1>

						{this.state.makeDrawer ?
								<Drawer
									title="My Peers"
									placement={'left'}
									closable={false}
									onClose={this.colseDrawer}
									visible={this.state.visibleDrawer}
								>
									<OtherPeers 
									changeSelectedPeer={this.changeSelectedPeer}
									selectedPeer={this.state.selectedPeer}
									peers={this.state.peers} afterPeerClick={this.colseDrawer} />
								</Drawer>
							: 
							<OtherPeers 
							changeSelectedPeer={this.changeSelectedPeer}
							selectedPeer={this.state.selectedPeer}
							peers={this.state.peers} />
						}

					</aside>


					<section>

						<div className='personal-info'>
							<div>

							{
							this.state.makeDrawer ?
								<Button 
								icon={"unordered-list"} 
								onClick={() => this.setState({ visibleDrawer: true })}/>
								: null
							}

							<p>ID: {this.state.myID.slice(this.state.myID.length - 5)}</p>
							
							</div>

							{!this.state.myName ? 
							<Search
								placeholder="Type your name"
								enterButton="Save"
								onSearch={value => this.saveMyName(value)}
							/>
							:
							<p>{this.state.myName}</p>
							}

						</div>

						<div className='msg-container'>
							{
								this.state.allMessages['global'].length?
								this.state.allMessages['global'].map((msg,index) => (
									<div
									 key={String(msg.from + Math.random())}
									 className={msg.from === this.state.myID?'msg-div my-msg':'msg-div'}
									>
										{msg.from == this.state.myID ? 
											<h5>{this.state.myName || this.state.myID.slice(this.state.myID.length - 5)}</h5>
											:
											<h5>{ this.mapNodeIDToName(msg.from) }</h5>
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
								placeholder="Type your message here ..."
								enterButton="Send"
								value={this.state.currentMsg}
								onChange={(event)=>this.setState({currentMsg: event.target.value})}
								onSearch={value => {
									IPFSChatInstance.sendNewMsg('global', value);
									this.setState({currentMsg: ''});

									setTimeout(()=>{
										let msgContainer = document.getElementsByClassName('msg-container')[0];
										msgContainer.scrollTop = msgContainer.scrollHeight;
									}, 200)
								
								}}
							/>
						</div>

					</section>

				</main></Fragment>)
    }
}

const OtherPeers = ({
    afterPeerClick,
    peers,
    selectedPeer,
    changeSelectedPeer
}) => (
    <div className='peers-ids-container'>
    
    <div
			className={selectedPeer == 'global' ? 'selected-peer': ''}
    >
    	
    	<p
				onClick={()=>{
					changeSelectedPeer('global')

					if(afterPeerClick)
					afterPeerClick()
			}}>

				{'global'}

			</p>

    </div>

{
	peers.length ?
		peers.map(peer => (
		<div 
			key={peer.nodeid}
			className={selectedPeer == peer.name || selectedPeer == peer.nodeid ? 'selected-peer': ''}
		>
		
		<p
		onClick={()=>{
			if(peer.name)
				changeSelectedPeer(peer.name)
			else changeSelectedPeer(peer.nodeid)

			if(afterPeerClick)
				afterPeerClick()
		}}>
			{peer.name || peer.nodeid.slice(peer.nodeid.length - 5)}
		</p>

		</div>
			))
	  :
		null
}

</div>
);

export default ChatApp;