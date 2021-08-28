import { Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import { useProfileAndSearchStyles } from './profile-and-search.style';
import { ProfileAndSearchProps } from './profile-and-search.type';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


export function ProfileAndSearch(props: ProfileAndSearchProps) {

    const { setMyName, myName } = props;
    const classes = useProfileAndSearchStyles();

    const [dialogOpenState, setDialogOpenState] = useState(true);
    const [name, setName] = useState('');

    function dialogCloseHandler() {
        setDialogOpenState(false);
        setMyName({ name })
    }


    return (
        <>

            <Dialog open={dialogOpenState && !myName} onClose={dialogCloseHandler}>
                <DialogTitle>
                    <Typography>
                        <IconButton>
                            <PersonAddIcon />
                        </IconButton>
                        {'Personal Information'}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <div className={classes.formContainer}>
                        <Typography color="textSecondary">
                            {'The name you will enter here is the name other users can see.'}
                        </Typography>
                        <TextField
                            className={classes.nameInput}
                            variant="outlined"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={dialogCloseHandler}>
                        {'Set my name'}
                    </Button>
                </DialogActions>
            </Dialog>

            <div className={classes.root}>

                <div className={classes.myNameContainer}>
                    <Typography variant="caption">
                        {myName || ''}
                    </Typography>
                    <IconButton onClick={() => setDialogOpenState(true)}>
                        <AccountCircleIcon fontSize="large" />
                    </IconButton>
                </div>
            </div>

        </>
    );
}