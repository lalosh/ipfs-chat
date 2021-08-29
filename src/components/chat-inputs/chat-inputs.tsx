import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import { useChatInputStyles } from './chat-inputs.style';
import { ChatInputsProps } from './chat-inputs.type';
import { useState } from 'react';
import { useCallback } from 'react';
import { addFileContentToIPFS, cidToBlobLinks } from '../../utils/ipfs-utils';
import { MY_IPFS_NODE } from '../../state/effects/init-ipfs.effect';
import { FileMessageObject } from '../../state/reducers/messages.reducer';
import MicIcon from '@material-ui/icons/Mic';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import { useRef } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { SendMessageAction } from '../../state/actions/send-message';
declare var MediaRecorder: any;
import {Composition} from 'atomic-layout';





export function ChatsInputs(props: ChatInputsProps) {

    const { sendMessage, selectedFriendId, myNodeId } = props;
    const classes = useChatInputStyles();
    const [inputValue, setInputValue] = useState('');
    const [blobUrl, setBlobUrl] = useState('');

    const stopButtonRef = useRef<HTMLButtonElement>(null);
    const deleteButtonRef = useRef<HTMLButtonElement>(null);

    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef<any>(null);
    const imageInputRef = useRef<any>(null);



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


    function sendVoice(params: Omit<SendMessageAction, "type">) {
        sendMessage(params);
    }

    function startRecording() {
        navigator
            .mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then(function (stream) {

                setIsRecording(true);


                const options = { mimeType: 'audio/webm' };
                const recordedChunks: any = [];
                const mediaRecorder = new MediaRecorder(stream, options);

                mediaRecorder.addEventListener('dataavailable', function (e: any) {
                    if (e.data.size > 0) recordedChunks.push(e.data);
                });

                async function onStopRecording() {

                    const newBlob = URL.createObjectURL(new Blob(recordedChunks));
                    setBlobUrl(newBlob);



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



                    sendVoice({
                        from: myNodeId,
                        to: selectedFriendId,
                        message: JSON.stringify(fileObject),
                        messageType: 'voice'
                    });


                }

                mediaRecorder.addEventListener('stop', onStopRecording);

                if (stopButtonRef && stopButtonRef.current)
                    stopButtonRef?.current?.addEventListener('click', function onStopClick() {
                        mediaRecorder.stop();
                        setIsRecording(false);
                        this.removeEventListener('click', onStopClick)
                    });

                if (deleteButtonRef && deleteButtonRef.current)
                    deleteButtonRef?.current?.addEventListener('click', function onStopClick() {

                        mediaRecorder.removeEventListener('stop', onStopRecording)
                        mediaRecorder.stop();
                        setIsRecording(false);

                        this.removeEventListener('click', onStopClick)
                    });


                mediaRecorder.start();
            });

    }

    if(!selectedFriendId) return null;

    return (
        <Composition
        className={classes.root}
        templateCols={`auto auto 1fr auto auto`}
        >

            <IconButton
                onClick={() => {
                    if (fileInputRef && fileInputRef.current)
                        fileInputRef.current.click()
                }}
            >
                <AttachFileIcon />
            </IconButton>

            <IconButton
                onClick={() => {
                    if (imageInputRef && imageInputRef.current)
                        imageInputRef.current.click()
                }}
            >
                <PermMediaIcon />
            </IconButton>


            <input
                onKeyUp={(event) => {
                    if (event.key == 'Enter') {
                        sendMessageHandler()
                    }
                }}
                value={inputValue}
                onChange={updateInputValue}
                className={classes.messageInput}
                placeholder="Write your message here"
            />

            {
                !isRecording ?
                    <IconButton onClick={startRecording}>
                        <MicIcon />
                    </IconButton>
                    :
                    <Composition templateCols={`auto 1fr auto`} alignItems="center">
                        <IconButton ref={deleteButtonRef} >
                            <DeleteSweepIcon />
                        </IconButton>

                        <RecordingTimer />

                        <IconButton ref={stopButtonRef}>
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </Composition>
            }





            <div style={{ display: 'none' }}>

                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={onFileChange}
                />

                <input
                    ref={imageInputRef}
                    type="file"
                    onChange={onImageChange}
                />
            </div>

            <IconButton onClick={sendMessageHandler}>
                <SendIcon />
            </IconButton>
        </Composition>
    );
}


function RecordingTimer() {


    const [time, setTime] = useState(moment());
    const [startTime, setStartTime] = useState(moment());

    useEffect(() => {

        setStartTime(moment());
        setTime(moment());

        let token = setInterval(() => {
            setTime(moment())
        }, 1000);

        return () => {
            clearInterval(token);
            setTime(moment());
        }
    }, []);

    return (
        <span>
            {
                time.diff(startTime, 'minutes')
            }:{
                time.diff(startTime, 'seconds')
            }
        </span>
    )
}