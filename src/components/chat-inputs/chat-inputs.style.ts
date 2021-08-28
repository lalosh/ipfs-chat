import { makeStyles } from "@material-ui/core";

export const useChatInputStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: "#edfff9",
        boxShadow: "0px -2px 4px #dedede",
        marginLeft: "2px"
    },
    messageInput: {
        border: "2px solid #6d7572",
        padding: "10px",
        flexGrow: 1,
        borderRadius: "6px",
        color: "#3c3c3c",
        '&:focus': {
            outline: 'none'
        }
    },
});