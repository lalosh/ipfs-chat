import { useMessagesPanelStyles } from "./messages-panel.style";
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

export function MessagesPanel() {

    const classes = useMessagesPanelStyles();

    return (
        <div className={classes.root}>
            {
                [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
                ].map(x => (
                    <div key={String(x)} className={clsx(classes.message, {
                        [classes.right]: x % 2 == 0,
                        [classes.left]: x % 2 != 0,
                    })}>
                        <Typography>
                            {'Message content here Message content here content here Message content herecontent here Message content here content here Message content here  content here Message content here content here Message content here'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" className={classes.time}>
                            {'5:40'}
                        </Typography>
                    </div>
                ))

            }
        </div>
    );
}