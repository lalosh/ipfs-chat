import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import { useChatInputStyles } from './chat-inputs.style';
import { ChatInputsProps } from './chat-inputs.type';
import { useState } from 'react';
import { useCallback } from 'react';
import { addFileContentToIPFS, cidToBlobLinks } from '../../utils/ipfs-utils';
import { MY_IPFS_NODE } from '../../state/effects/init-ipfs.effect';
import { FileMessageObject } from '../../state/reducers/messages.reducer';

import { useRef } from 'react';
declare var MediaRecorder: any;

export function ChatsInputs(props: ChatInputsProps) {

    const { sendMessage, selectedFriendId, myNodeId } = props;
    const classes = useChatInputStyles();
    const [inputValue, setInputValue] = useState('');
    const [blobUrl, setBlobUrl] = useState('');
    const stopButtonRef = useRef<HTMLButtonElement>(null);



    function sendMessageHandler() {

        setInputValue('');

        if (myNodeId && selectedFriendId && inputValue)
            sendMessage({
                from: myNodeId,
                to: selectedFriendId,
                message: inputValue,
                messageType: 'text'
            });
    }

    const updateInputValue = useCallback((event) => setInputValue(event.target.value), []);

    async function onFileChange(event: any) {
        try {

            const file = event.target.files[0];

            const cid = await addFileContentToIPFS({
                ipfsNode: MY_IPFS_NODE,
                content: file,
                path: file.name
            });

            console.log({ cid })

            const fileObject: FileMessageObject = {
                cid,
                fileName: file.name,
                fileType: file.type
            }

            sendMessage({
                from: myNodeId,
                to: selectedFriendId,
                message: JSON.stringify(fileObject),
                messageType: 'file'
            });


        } catch (error) {
            console.error(error);
        }

    }


    async function onImageChange(event: any) {
        try {

            const file = event.target.files[0];

            const cid = await addFileContentToIPFS({
                ipfsNode: MY_IPFS_NODE,
                content: file,
                path: file.name
            });


            const fileObject: FileMessageObject = {
                cid,
                fileName: file.name,
                fileType: file.type
            }

            sendMessage({
                from: myNodeId,
                to: selectedFriendId,
                message: JSON.stringify(fileObject),
                messageType: 'image'
            });


        } catch (error) {
            console.error(error);
        }

    }

    function startRecording() {

        navigator
            .mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then(function (stream) {
           
                const options = { mimeType: 'audio/webm' };
                const recordedChunks: any = [];
                const mediaRecorder = new MediaRecorder(stream, options);

                mediaRecorder.addEventListener('dataavailable', function (e: any) {
                    if (e.data.size > 0) recordedChunks.push(e.data);
                });

                mediaRecorder.addEventListener('stop',async function onStop() {

                    const newBlob = URL.createObjectURL(new Blob(recordedChunks));
                    setBlobUrl(newBlob);

                    console.log({recordedChunks})

                    const cid = await addFileContentToIPFS({
                        ipfsNode: MY_IPFS_NODE,
                        content: recordedChunks[0],
                        path: 'audio'
                    });
        
        
                    const fileObject: FileMessageObject = {
                        cid,
                        fileName: 'some-audio.webm',
                        fileType: 'wav'
                    }

                    console.log({cid})
        
                    sendMessage({
                        from: myNodeId,
                        to: selectedFriendId,
                        message: JSON.stringify(fileObject),
                        messageType: 'voice'
                    });
        

                });

                if (stopButtonRef && stopButtonRef.current)
                    stopButtonRef?.current?.addEventListener('click', function onStopClick() {
                        mediaRecorder.stop();
                        this.removeEventListener('click', onStopClick)
                    });


                mediaRecorder.start();
            });

    }

    return (
        <div className={classes.root}>
            <input
                value={inputValue}
                onChange={updateInputValue}
                className={classes.messageInput}
                placeholder="Write your message here"
            />
            <button onClick={startRecording}>{'rec'}</button>
            <button ref={stopButtonRef}>{'stop'}</button>
            <a download="file.wav" href={blobUrl}>{'download audio'}</a>
            {
                blobUrl ?
                    <audio id="player" src={blobUrl} controls></audio>
                    :
                    null
            }

            {/* <input type="file" accept="audio/*" capture/> */}

            {/* 
            <input
                type="file"
                onChange={onFileChange}
            />

            <div>
                <span>{'image'}</span>
                <input
                    type="file"
                    onChange={onImageChange}
                />
            </div> */}
            <IconButton onClick={sendMessageHandler}>
                <SendIcon />
            </IconButton>
        </div>
    );
}