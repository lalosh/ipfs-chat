import { Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContactsListStyles } from './contacts-list.style';
import clsx from 'clsx';
import { ContactsListProps } from './contacts-list.type';
import moment from 'moment';



export function ContactsList(props: ContactsListProps) {

    const { friends, selectedFriendId, setSelectedFriendID, messages } = props;
    const classes = useContactsListStyles();

    return (
        <div className={classes.root}>

            <Typography className={classes.title}>{'Messages'}</Typography>


            <div className={classes.listContainer}>

                {
                    Object.keys(friends).map(friendId => (

                        <div
                            onClick={() => setSelectedFriendID({ friendId })}
                            key={friendId}
                            className={clsx(classes.listItem, {
                                [classes.activeItem]: friendId == selectedFriendId
                            })}
                        >

                            <IconButton>
                                <AccountCircleIcon className={classes.AccountIcon} fontSize="large" />
                            </IconButton>

                            <div className={classes.nameAndMessage}>
                                <Typography>{friends[friendId]}</Typography>
                                <Typography color="textSecondary" variant="caption">
                                    {messages?.[friendId]?.[messages?.[friendId]?.length - 1]?.message ?? '...'}
                                </Typography>
                            </div>

                            <div className={classes.timeAndOnline}>
                                <Typography color="textSecondary">
                                    {
                                        messages?.[friendId]?.[messages?.[friendId]?.length - 1]?.timestamp ?
                                            moment(messages?.[friendId]?.[messages?.[friendId]?.length - 1]?.timestamp).format('mm:ss')
                                            :
                                            ''
                                    }
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