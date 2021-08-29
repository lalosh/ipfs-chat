import { Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useReceiverContainerStyles } from './receiver-section.style';
import { ReceiverSectionProps } from './receiver-section.type';
import MenuIcon from '@material-ui/icons/Menu';


export function ReceiverSection(props: ReceiverSectionProps) {

    const { receiverName, lastSeen, openDrawer, showOpenButton } = props;
    const classes = useReceiverContainerStyles();

    return (
        <div className={classes.root}>



            <div className={classes.receiverContainer}>
                {
                    showOpenButton ?
                        <>
                            <IconButton onClick={openDrawer}>
                                <MenuIcon />
                            </IconButton>
                            <Typography>
                                {'Contacts List'}
                            </Typography>
                        </>
                        :
                        null
                }

                <IconButton>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
                <div>
                    <Typography>{receiverName}</Typography>
                    <Typography variant="caption">{lastSeen}</Typography>
                </div>
            </div>

            <div className={classes.iconsContainer}>
                {/* <input /> */}
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>

        </div>
    );
}


