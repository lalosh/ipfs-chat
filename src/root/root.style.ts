import { makeStyles } from "@material-ui/core";

export const useRootStyles = makeStyles({
    logoContainer: {
        background: '#27d29b'
    },
    contactsListContainer: {
        boxShadow: '#cecece 3px 0px 3px'
    },
    receiverSectionContainer: {
        background: "#27d29b",
        filter: "grayscale(0.4)"
    },
    borderLeftForReceiver: {
        borderLeft: "2px solid white",
    },
    overflowAuto: {
        overflow: 'auto',
    },
    contactsList: {
        boxShadow: '#cecece 3px 0px 3px'
    }
});