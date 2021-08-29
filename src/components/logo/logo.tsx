import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Typography, IconButton } from '@material-ui/core';
import { useLogoStyles } from './logo.style';
import { ProfileAndSearchContainer } from '../profile-and-search/profile-and-search.container';
import { Composition } from 'atomic-layout';

export function LogoContainer() {

    const classes = useLogoStyles();


    return (
        <Composition
            templateCols={'auto auto 1fr'}
            alignItems="center"
        >

            <IconButton>
                <QuestionAnswerIcon className={classes.icon} />
            </IconButton>

            <Typography className={classes.title}>
                {'IPFS Chat'}
            </Typography>


            <ProfileAndSearchContainer />

        </Composition>
    );
}