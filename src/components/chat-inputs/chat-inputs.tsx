import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import { useChatInputStyles } from './chat-inputs.style';
import { ChatInputsProps } from './chat-inputs.type';
import { useState } from 'react';
import { useCallback } from 'react';


export function ChatsInputs(props: ChatInputsProps) {

    const { sendMessage, selectedFriendId, myNodeId } = props;
    const classes = useChatInputStyles();
    const [inputValue, setInputValue] = useState('');

    function sendMessageHandler() {

        setInputValue('');

        if (myNodeId && selectedFriendId && inputValue)
            sendMessage({
                from: myNodeId,
                to: selectedFriendId,
                message: inputValue
            });
    }

    const updateInputValue = useCallback((event) => setInputValue(event.target.value), []);


    return (
        <div className={classes.root}>
            <input
                value={inputValue}
                onChange={updateInputValue}
                className={classes.messageInput}
                placeholder="Write your message here"
            />

            <IconButton onClick={sendMessageHandler}>
                <SendIcon />
            </IconButton>
        </div>
    );
}