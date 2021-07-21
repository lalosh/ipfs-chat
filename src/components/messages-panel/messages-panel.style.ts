import { makeStyles } from "@material-ui/core";

export const useMessagesPanelStyles = makeStyles({
    root:{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        maxHeight: '79vh',
        overflow: 'auto'
    },
    message:{
        background: '#ddd',
        borderRadius: '10px',
        padding: '10px',
        maxWidth: '55%',
        margin: '5px 0',
        position: 'relative',
    }, 
    time:{
        // position: 'absolute',
        // bottom: '10px',
        // right: '15px'
    },
    left: {
        alignSelf: 'flex-start',
        background: '#f1d82787',
    },
    right: {
        alignSelf: 'flex-end',
        background: '#20fef73b',
    },
});