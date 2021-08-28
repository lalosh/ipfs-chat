import MessageIcon from '@material-ui/icons/Message';
import PhoneIcon from '@material-ui/icons/Phone';
import SettingsIcon from '@material-ui/icons/Settings';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Typography, IconButton } from '@material-ui/core';
import { useSideNavStyles } from './side-nav.style';

export function SideNav() {

    const classes = useSideNavStyles();

    return (<></>)
    // return (
    //     <div className={classes.root}>
    //         <div className={classes.item}>
    //             <IconButton>
    //                 <MessageIcon fontSize="large" />
    //             </IconButton>
    //             <Typography>{'Messages'}</Typography>
    //         </div>
    //         <div className={classes.item}>
    //             <IconButton>
    //                 <PhoneIcon fontSize="large" />
    //             </IconButton>
    //             <Typography>{'Calls'}</Typography>
    //         </div>
    //         <div className={classes.item}>
    //             <IconButton>
    //                 <DonutLargeIcon fontSize="large" />
    //             </IconButton>
    //             <Typography>{'Status'}</Typography>
    //         </div>
    //         <div className={classes.item}>
    //             <IconButton>
    //                 <SettingsIcon fontSize="large" />
    //             </IconButton>
    //             <Typography>{'Setting'}</Typography>
    //         </div>

    //     </div>
    // );
}