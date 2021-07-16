import { Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContactsListStyles } from './contacts-list.style';
import clsx from 'clsx';


export function ContactsList() {

    const classes = useContactsListStyles();

    return (
        <div className={classes.root}>

            <Typography className={classes.title}>{'Messages'}</Typography>


            <div className={classes.listContainer}>

                {
                    [1, 2, 3].map(x => (
                        <div key={String(x)}
                            className={clsx(classes.listItem, {
                                [classes.activeItem]: x == 2
                            })}>
                            <IconButton>
                                <AccountCircleIcon className={classes.AccountIcon} fontSize="large" />
                            </IconButton>
                            <div className={classes.nameAndMessage}>
                                <Typography>{'First name'}</Typography>
                                <Typography color="textSecondary" variant="caption">{'last message'}</Typography>
                            </div>
                            <div className={classes.timeAndOnline}>
                                <Typography color="textSecondary">
                                    {'2:30'}
                                </Typography>
                                <div className={classes.isOnline}></div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}