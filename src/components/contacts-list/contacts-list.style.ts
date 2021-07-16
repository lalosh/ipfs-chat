import { makeStyles } from "@material-ui/core";

export const useContactsListStyles = makeStyles({
    root: {
        padding: '10px',
    },

    listContainer: {

    },

    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ddd',
        padding: '0 8px',
        margin: '5px 0',
        '&:hover':{
            cursor: 'pointer'
        }
    },
    activeItem: {
        borderRadius: "10px",
        background: "linear-gradient( 90deg, #f2d82680, #1afffe66)",
        boxShadow: "0 0 5px #c9c9c9"
    },
    nameAndMessage: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    AccountIcon: {
        alignSelf: 'center'
    },
    title: {
        textAlign: 'center',
        margin: '20px 0',
        fontSize: '30px'
    },
    isOnline:{
        width: '10px',
        height: '10px',
        background: '#58f858',
        borderRadius: '50%',
    },
    timeAndOnline:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
    }
});