import { makeStyles } from "@material-ui/core";

export const useLogoStyles = makeStyles({

    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    },
    icon:{
        fontSize: '50px',
        color: 'white',
    },
    title:{
        color: 'white',
    }
});