import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Typography, IconButton } from '@material-ui/core';
import { useLogoStyles } from './logo.style';


export function LogoContainer() {

    const classes = useLogoStyles();


    return (
        <div className={classes.root}>

            <IconButton>
                <QuestionAnswerIcon className={classes.icon} />
            </IconButton>

            <Typography className={classes.title}>
                {'Peer-to-Peer Chat'}
            </Typography>

        </div>
    );
}