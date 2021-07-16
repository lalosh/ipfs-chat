import { Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useReceiverContainerStyles } from './receiver-container.style';


export function ReceiverContainer() {

    const classes = useReceiverContainerStyles();

    return (
        <div className={classes.root}>

            <div className={classes.receiverContainer}>
                <IconButton>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
                <div>
                    <Typography>{'Receiver name'}</Typography>
                    <Typography variant="caption">{'last seen'}</Typography>
                </div>
            </div>

            <div className={classes.iconsContainer}>
                <IconButton>
                    <PhoneIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>

        </div>
    );
}


