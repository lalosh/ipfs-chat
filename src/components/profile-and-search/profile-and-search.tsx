import { Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import { useProfileAndSearchStyles } from './profile-and-search.style';
import { ProfileAndSearchProps } from './profile-and-search.type';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Composition } from 'atomic-layout';

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
                <DialogTitle style={{ padding: '0' }}>
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
                            {'Enter your chat username:'}
                        </Typography>
                        <TextField
                            className={classes.nameInput}
                            variant="outlined"
                            value={name}
                            onKeyUp={(event) => {
                                if (event.key == 'Enter')
                                    dialogCloseHandler();
                            }}
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

            <Composition
                templateCols={`1fr auto`}
                alignItems="center"
            >

                <Typography variant="caption" style={{ textAlign: 'right' }}>
                    {myName || ''}
                </Typography>

                <IconButton onClick={() => setDialogOpenState(true)}>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>

            </Composition>

        </>
    );
}