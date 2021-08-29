import { useMessagesPanelStyles } from "./messages-panel.style";
import clsx from 'clsx';
import { MessagesPanelProps } from "./message-panel.type";
import { useEffect } from "react";
import { useRef } from "react";
import { RenderImageMessage } from "./messages-types/image.message";
import { RenderFileMessage } from "./messages-types/file.message";
import { RenderVoiceMessage } from "./messages-types/voice.message";
import { RenderTextMessage } from "./messages-types/text.message";




export function MessagesPanel(props: MessagesPanelProps) {

    const { selectedFriendId, messages, myNodeId } = props;
    const classes = useMessagesPanelStyles();
    const messagesContainerRef = useRef<any>(null);



    useEffect(function scrollToBottom() {
        if (messagesContainerRef && messagesContainerRef.current) {

            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages.length]);




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