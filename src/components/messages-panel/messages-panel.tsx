import { useMessagesPanelStyles } from "./messages-panel.style";
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { MessagesPanelProps } from "./message-panel.type";
import moment from 'moment';



export function MessagesPanel(props: MessagesPanelProps) {

    const { selectedFriendId, messages, myNodeId } = props;
    const classes = useMessagesPanelStyles();

    return (
        <div className={classes.root}>
            {
                messages.map(message => (
                    <div key={String(message)} className={clsx(classes.message, {
                        [classes.right]: message.authorId == myNodeId,
                        [classes.left]: message.authorId == selectedFriendId,
                    })}>
                        <Typography>
                            {message.message}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" className={classes.time}>
                            {moment(message.timestamp).format('h:mm:ss')}
                        </Typography>
                    </div>
                ))

            }
        </div>
    );
}