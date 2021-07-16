import { makeStyles } from "@material-ui/core";

export const useRootStyles = makeStyles({
    root: {
        height: "100vh",
        width: "100vw",
        display: "grid",
        gridTemplateColumns: "140px 400px 1fr",
        gridTemplateRows: "80px 70px 1fr 90px"
    },
    topNavContainer: {
        gridRow: "1/3",
        gridColumn: "1/4",
        background: "linear-gradient(90deg, #f2d826, #1afffe)",
    },
    sideNavContainer: {
        gridRow: "3/5",
        gridColumn: "1/2"
    },
    contactsListContainer: {
        gridRow: "2/5",
        gridColumn: "2/3",
        background: 'white',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        boxShadow: '0 0 10px #c1c1c1',
        zIndex: 3,

    },
    messagesPanelContainer: {
        gridRow: "3/5",
        gridColumn: "3/4",
    },
    chatInputsContainer: {
        gridRow: "4/5",
        gridColumn: "3/4",
        alignSelf: 'end',
        background: 'white',
        zIndex:2,
    },
    logoContainer: {
        gridRow: "1/2",
        gridColumn: "2/3"
    },
    profileAndSearch: {
        gridRow: "1/2",
        gridColumn: "3/4"
    },
    receiverContainer: {
        gridRow: "2/3",
        gridColumn: "3/4"
    },
});