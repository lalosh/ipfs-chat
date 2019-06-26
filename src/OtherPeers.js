import React from 'react';
import {Spin} from 'antd';

const OtherPeers = ({
	afterPeerClick,
	peers,
	selectedPeer,
	changeSelectedPeer
}) => (
		<div className='peers-ids-container'>

			<div
				className={selectedPeer == 'global' ? 'selected-peer' : ''}
				onClick={() => {
						changeSelectedPeer('global')

						if (afterPeerClick)
							afterPeerClick()
					}}
			>

				<p
					>

					{'Global chat'}

				</p>

			</div>

			{
				peers.length ?
					peers.map(peer => (
						<div
							key={peer.nodeid}
							className={selectedPeer == peer.name || selectedPeer == peer.nodeid ? 'selected-peer' : ''}
							onClick={() => {
									// if (peer.name)
									// 	changeSelectedPeer(peer.name)
									// else
									 changeSelectedPeer(peer.nodeid)

									if (afterPeerClick)
										afterPeerClick()
								}}
						>

							<p
								>
								{peer.name || peer.nodeid.slice(peer.nodeid.length - 5)}
							</p>

						</div>
					))
					:
					<span><div className='spin-container'><Spin size="large" /></div></span>
			}

		</div>
	);

export default OtherPeers;