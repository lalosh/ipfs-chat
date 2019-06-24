import React, { Fragment } from 'react';
import './ChatApp.css';
import { Button, Input, Drawer, Icon } from 'antd';
import IPFSChat from './IPFSChat.js';
// const IPFSChat = require('./IPFSChat.js')
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
            currentMsg: 'hello guys',
            peers: [
                { name: 'global', nodeid: 'jalifjalifj1' },
                { name: 'anas', nodeid: 'jalifjalifj2' },
                { name: 'moied', nodeid: 'jalifjalifj3' },
                { name: 'mam', nodeid: 'jalifjalifj4' },
                { name: '', nodeid: 'jalifjalifj5' },
            ],
            selectedPeer: 'global',
            allMessages: {
                'global': [
                    { from: 'anas', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                    { from: 'memo', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                    { from: 'omar', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                    { from: 'mam', data: 'hello from anas', date: '2018-6-5 5:23 AM' },
                ]
            }
        }

        this.colseDrawer = this.colseDrawer.bind(this);
        this.changeSelectedPeer = this.changeSelectedPeer.bind(this);
        this.saveMyName = this.saveMyName.bind(this);
        this.sendNewMessage = this.sendNewMessage.bind(this);
        this.changeMyID = this.changeMyID.bind(this);
				
				IPFSChatInstance = new IPFSChat(this.changeMyID);


    }
    changeMyID(id){
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
    receiveNewMsg(sender, msg){
    	if(sender && msg){

    		this.setState(oldState => {

    			let newAllMessages = Object.assign({}, oldState.allMessages);
    			
    			newAllMessages[sender].push({
    				from: sender,
    				data: msg,
    				date: '2015-52-51 52:45 AM'
    			});
    			
    			return {
    				allMessages: newAllMessages
    			}

    		});

    	}
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));

        IPFSChatInstance.newSubscribe('global', this.receiveNewMsg)
    }
    render() {
        return (
            <Fragment>

				<main>

					<aside>

						<h1> My Peers {this.state.selectedPeer} </h1>

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

							<div className='msg-div'>
								<h5>from</h5>
								<p>hello from the from of the from oh hi oh hi</p>
								<h6>25-12-2016 3:52AM</h6>
							</div>

							<div className='msg-div my-msg'>
								<h5>from</h5>
								<p>hello from the from of the from</p>
								<h6>25-12-2016 3:52AM</h6>
							</div>

						</div>

						<div>
							<Search
								placeholder="Type your message here ..."
								enterButton="Send"
								onSearch={value => console.log(value)}
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
			{peer.name || peer.nodeid}
		</p>

		</div>
			))
	  :
		null
}

</div>
);

export default ChatApp;