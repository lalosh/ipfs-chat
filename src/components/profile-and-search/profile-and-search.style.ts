import { makeStyles } from "@material-ui/core";

export const useProfileAndSearchStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    searchInput: {
        borderRadius: '25px',
        width: '60%',
        height: '35px',
        border: 'none',
        padding: '10px',
        background: '#eeeeee',
        '&:focus': {
            outline: 'none'
        }
    },
    myNameContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
    },
    formContainer: {
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    nameInput:{
        margin: '20px 0'
    },

});