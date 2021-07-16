import { Typography, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useProfileAndSearchStyles } from './profile-and-search.style';

export function ProfileAndSearch() {

    const classes = useProfileAndSearchStyles();

    return (
        <div className={classes.root}>

            <input
                className={classes.searchInput}
                type="text"
                placeholder="Search messages"

            />

            <div className={classes.myNameContainer}>
                <Typography variant="h6">
                    {'My Name'}
                </Typography>
                <IconButton>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            </div>
        </div>
    );
}