import { useMessagesPanelStyles } from "../messages-panel.style";
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { MessageObject } from "../../../state/reducers/messages.reducer";


export function RenderTextMessage({ message }: { message: MessageObject }) {

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
