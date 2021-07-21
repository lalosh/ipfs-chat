import { makeStyles } from "@material-ui/core";

export const useReceiverContainerStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: '5px',
    },
    iconsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    receiverContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});