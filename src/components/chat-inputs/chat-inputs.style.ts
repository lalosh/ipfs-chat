import { makeStyles } from "@material-ui/core";

export const useChatInputStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
    },
    messageInput: {
        flexGrow: 1,
        padding: "10px",
        borderRadius: "25px",
        border: "2px solid #a0a0a0",
        '&:focus':{
            outline: 'none'
        }
    },
});