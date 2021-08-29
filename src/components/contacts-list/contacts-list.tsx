import { Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContactsListStyles } from './contacts-list.style';
import clsx from 'clsx';
import { ContactsListProps } from './contacts-list.type';
import moment from 'moment';



export function ContactsList(props: ContactsListProps) {

    const {
        friends,
        selectedFriendId,
        setSelectedFriendID,
        messages,
        drawerCloseHandler,
        unReadMessages,
        resetUnReadMessagesCount,
    } = props;

    const classes = useContactsListStyles();




    return (
        <div className={classes.root}>

            {/* <Typography className={classes.title}>{'Messages'}</Typography> */}


            <div className={classes.listContainer}>

                {
                    Object.keys(friends).map(friendId => (

                        <div
                            onClick={() => {
                                drawerCloseHandler()
                                setSelectedFriendID({ friendId })
                                resetUnReadMessagesCount({ friendId })
                            }}
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
                                    {
                                        messages?.[friendId]?.[messages?.[friendId]?.length - 1].messageType == 'text' ?
                                            messages?.[friendId]?.[messages?.[friendId]?.length - 1]?.message ?? '...'
                                            :
                                            (
                                                messages?.[friendId]?.[messages?.[friendId]?.length - 1].messageType == 'file' ||
                                                messages?.[friendId]?.[messages?.[friendId]?.length - 1].messageType == 'image' ||
                                                messages?.[friendId]?.[messages?.[friendId]?.length - 1].messageType == 'voice'
                                            )
                                                ?
                                                'File'
                                                :
                                                ''
                                    }
                                </Typography>
                            </div>

                            <div className={classes.timeAndOnline}>
                                <Typography color="textSecondary">
                                    {
                                        messages?.[friendId]?.[messages?.[friendId]?.length - 1]?.timestamp ?
                                            moment(messages?.[friendId]?.[messages?.[friendId]?.length - 1]?.timestamp).format('hh:mm A')
                                            :
                                            ''
                                    }
                                </Typography>
                                {
                                    selectedFriendId == friendId
                                        ||
                                        !unReadMessages[friendId]
                                        ?
                                        null
                                        :
                                        <div className={classes.unReadContainer}>{`${unReadMessages?.[friendId] ?? 0}`}</div>
                                }
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}