import { useMessagesPanelStyles } from "../messages-panel.style";
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { FileMessageObject, MessageObject } from "../../../state/reducers/messages.reducer";
import { useEffect } from "react";
import { cidToBlobLinks } from "../../../utils/ipfs-utils";
import { MY_IPFS_NODE } from "../../../state/effects/init-ipfs.effect";
import { useState } from "react";



export function RenderVoiceMessage({ message }: { message: MessageObject }) {

    const [blobUrl, setBlobUrl] = useState('');
    const classes = useMessagesPanelStyles();

    const _message: FileMessageObject = JSON.parse(message.message);
    const cid = _message.cid;


    useEffect(() => {


        cidToBlobLinks({
            cid,
            ipfsNode: MY_IPFS_NODE,
        })
            .then(result => setBlobUrl(result[0]))
            .catch(console.error);

    }, [message])

    const fileName: string = _message.fileName;
    const fileType: string = _message.fileType;


    return (
        <>

            <audio src={blobUrl} controls></audio>


            <Typography variant="body1" color="textSecondary" className={classes.time}>
                {moment(message.timestamp).format('h:mm:ss')}
            </Typography>
        </>
    );
}
