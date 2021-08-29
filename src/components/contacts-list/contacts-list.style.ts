import { makeStyles } from "@material-ui/core";

export const useContactsListStyles = makeStyles({
    root: {
        padding: '10px',
        maxHeight: '90vh',
        overflow: 'auto',
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
        background: "#75d1b4",
        boxShadow: "0 0 3px #c9c9c9",
        borderRadius: "4px",
        transition: 'all 0.5s ease-out',
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
    },
    unReadContainer:{
        background: "#eac50f",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        color: "white",
        border: "2px solid #ab7107"
    }
});