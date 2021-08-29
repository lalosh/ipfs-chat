import { useMessagesPanelStyles } from "./messages-panel.style";
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { MessagesPanelProps } from "./message-panel.type";
import moment from 'moment';
import { FileMessageObject, MessageObject } from "../../state/reducers/messages.reducer";
import { useEffect } from "react";
import { cidToBlobLinks } from "../../utils/ipfs-utils";
import { MY_IPFS_NODE } from "../../state/effects/init-ipfs.effect";
import { useState } from "react";
import { useRef } from "react";

function RenderTextMessage({ message }: { message: MessageObject }) {

    const classes = useMessagesPanelStyles();

    return (
        <>
            <Typography>
                {message.message}
            </Typography>

            <Typography variant="body1" color="textSecondary" className={classes.time}>
                {moment(message.timestamp).format('h:mm:ss')}
            </Typography>
        </>
    );
}


function RenderFileMessage({ message }: { message: MessageObject }) {

    const [blobUrl, setBlobUrl] = useState('');
    const classes = useMessagesPanelStyles();

    const _message: FileMessageObject = JSON.parse(message.message);
    const cid = _message.cid;


    useEffect(() => {


        cidToBlobLinks({
            cid,
            ipfsNode: MY_IPFS_NODE,
        })
            .then(result => setBlobUrl(result[0]))
            .catch(console.error);

    }, [message])

    const fileName: string = _message.fileName;
    const fileType: string = _message.fileType;


    return (
        <>
            <a
                download={fileName}
                href={blobUrl}
            >
                {fileName}
            </a>


            <Typography variant="body1" color="textSecondary" className={classes.time}>
                {moment(message.timestamp).format('h:mm:ss')}
            </Typography>
        </>
    );
}





function RenderVoiceMessage({ message }: { message: MessageObject }) {

    const [blobUrl, setBlobUrl] = useState('');
    const classes = useMessagesPanelStyles();

    const _message: FileMessageObject = JSON.parse(message.message);
    const cid = _message.cid;


    useEffect(() => {


        cidToBlobLinks({
            cid,
            ipfsNode: MY_IPFS_NODE,
        })
            .then(result => setBlobUrl(result[0]))
            .catch(console.error);

    }, [message])

    const fileName: string = _message.fileName;
    const fileType: string = _message.fileType;


    return (
        <>

            <audio src={blobUrl} controls></audio>


            <Typography variant="body1" color="textSecondary" className={classes.time}>
                {moment(message.timestamp).format('h:mm:ss')}
            </Typography>
        </>
    );
}

function RenderImageMessage({ message }: { message: MessageObject }) {

    const [blobUrl, setBlobUrl] = useState('');
    const classes = useMessagesPanelStyles();

    const _message: FileMessageObject = JSON.parse(message.message);
    const cid = _message.cid;


    useEffect(() => {


        cidToBlobLinks({
            cid,
            ipfsNode: MY_IPFS_NODE,
        })
            .then(result => setBlobUrl(result[0]))
            .catch(console.error);

    }, [message])

    const fileName: string = _message.fileName;
    const fileType: string = _message.fileType;


    return (
        <>

            <img
                src={blobUrl}
                alt={fileName}
                style={{ maxWidth: '100%', borderRadius: '4px' }}
            />


            <Typography variant="body1" color="textSecondary" className={classes.time}>
                {moment(message.timestamp).format('h:mm:ss')}
            </Typography>
        </>
    );
}


export function MessagesPanel(props: MessagesPanelProps) {

    const { selectedFriendId, messages, myNodeId } = props;
    const classes = useMessagesPanelStyles();
    const messagesContainerRef = useRef<any>(null);

    useEffect(() => {
        if (messagesContainerRef && messagesContainerRef.current) {

            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages.length])

    const renderedMessages = messages.map(message => {
        switch (message.messageType) {

            case 'image':
                return <RenderImageMessage message={message} />

            case 'file':
                return <RenderFileMessage message={message} />

            case 'voice':
                return <RenderVoiceMessage message={message} />


            default:
                return <RenderTextMessage message={message} />
        }
    })


    return (
        <div
            className={classes.root}
            ref={messagesContainerRef}
        >
            {
                messages
                    .map((message, index) => (
                        <div
                            key={`${message.message}-${index}`}
                            className={clsx(classes.message, {
                                [classes.right]: message.authorId == myNodeId,
                                [classes.left]: message.authorId == selectedFriendId,
                            })}
                        >

                            {renderedMessages[index]}

                        </div>
                    ))

            }
        </div>
    );
}