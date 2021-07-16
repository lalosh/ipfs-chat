import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import { useChatInputStyles } from './chat-inputs.style';


export function ChatsInputs() {

    const classes = useChatInputStyles();


    return (
        <div className={classes.root}>
            <input
                className={classes.messageInput}
                placeholder="Write your message here"
            />

            <IconButton>
                <SendIcon />
            </IconButton>
        </div>
    );
}