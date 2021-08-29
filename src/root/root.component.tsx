import { ChatInputsContainer } from "../components/chat-inputs/chat-inputs.container";
import { ContactsListContainer } from "../components/contacts-list/contacts-list.container";
import { MessagePanelContainer } from "../components/messages-panel/messages-panel.container";
import { useRootStyles } from "./root.style";
import { LogoContainer } from '../components/logo/logo';
import { ReceiverSectionContainer } from '../components/receiver-section/receiver-section.container';
import { RootComponentProps } from "./root.type";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Composition } from 'atomic-layout'
import { Drawer, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";





export function RootComponent(props: RootComponentProps) {

    const { initIPFS, messages } = props;
    const classes = useRootStyles();

    const [openDrawer, setOpenDrawer] = useState(false);

    const messagesContainerRef = useRef<any>(null);

    const isSmallScreen = useMediaQuery('(max-width: 768px)')



    useEffect(function scrollToBottom() {
        if (messagesContainerRef && messagesContainerRef.current) {
            setTimeout(() => {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }, 0);
        }
    }, [messages]);



    useEffect(function onStart() {
        initIPFS({});
    }, []);





    if (isSmallScreen) {

        return (
            <>


                <Drawer
                    anchor={'left'}
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <Composition
                        templateRows={'70px 1fr'}
                        height="100vh"
                        width="80vw"
                    >
                        <div className={classes.logoContainer}>
                            <LogoContainer />
                        </div>

                        <div className={classes.contactsListContainer}>
                            <ContactsListContainer
                                drawerCloseHandler={() => setOpenDrawer(false)}
                            />

                        </div>
                    </Composition>
                </Drawer>

                <Composition
                    templateRows={'70px 70px 1fr'}
                    height={'100vh'}
                    maxHeight={'100vh'}
                >

                    <div className={classes.logoContainer} >
                        <LogoContainer />
                    </div>

                    <div className={classes.receiverSectionContainer}>
                        <ReceiverSectionContainer
                            openDrawer={() => setOpenDrawer(true)}
                            showOpenButton={isSmallScreen}
                        />
                    </div>

                    <Composition
                        height="100%"
                        maxHeight={'calc(100vh - 140px)'}
                        templateRows={'1fr auto'}
                    >
                        <div className={classes.overflowAuto} ref={messagesContainerRef}>
                            <MessagePanelContainer />
                        </div>

                        <ChatInputsContainer />

                    </Composition>

                </Composition>

            </>
        )
    }


    return (
        <Composition
            templateCols={'30vw 1fr'}
            templateRows={'70px 1fr'}
            height="100vh"
            maxHeight="100vh"
            width="100vw"
            areas={`
                    identity receiver
                    contacts messages
                `}
        >

            {
                ({
                    Identity,
                    Receiver,
                    Contacts,
                    Messages
                }) => (
                    <>
                        <Identity className={classes.logoContainer}>
                            <LogoContainer />
                        </Identity>
                        <Receiver className={clsx(classes.receiverSectionContainer, classes.borderLeftForReceiver)}>

                            <ReceiverSectionContainer
                                openDrawer={() => setOpenDrawer(true)}
                                showOpenButton={isSmallScreen}
                            />

                        </Receiver>
                        <Contacts className={classes.contactsList}>

                            <ContactsListContainer
                                drawerCloseHandler={() => setOpenDrawer(false)}
                            />


                        </Contacts>
                        <Messages className={classes.overflowAuto}>
                            <Composition
                                height="100%"
                                templateRows={'1fr auto'}
                            >

                                <MessagePanelContainer />
                                <ChatInputsContainer />

                            </Composition>
                        </Messages>
                    </>
                )
            }


        </Composition>
    );

}