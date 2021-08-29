import { makeStyles } from "@material-ui/core";

export const useMessagesPanelStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        // maxHeight: '75vh',
        overflow: 'auto'
    },
    message: {
        background: '#ddd',
        borderRadius: '5px',
        padding: '10px',
        // maxWidth: '55%',
        minWidth: '200px',
        margin: '5px 0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    time: {
        // position: 'absolute',
        // bottom: '10px',
        // right: '15px'
        color: '#676767',
        paddingTop: '10px',
        fontSize: '12px',
    },
    left: {
        alignSelf: 'flex-start',
        background: '#ffe31f',
        alignItems: 'flex-start'
    },
    right: {
        alignSelf: 'flex-end',
        background: '#86DE28',
        alignItems: 'flex-end'
    },
});