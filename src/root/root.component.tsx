import { ChatInputsContainer } from "../components/chat-inputs/chat-inputs.container";
import { ContactsListContainer } from "../components/contacts-list/contacts-list.container";
import { MessagePanelContainer } from "../components/messages-panel/messages-panel.container";
import { SideNav } from "../components/side-nav/side-nav";
import { useRootStyles } from "./root.style";
import { LogoContainer } from '../components/logo/logo';
import { ProfileAndSearchContainer } from '../components/profile-and-search/profile-and-search.container';
import { ReceiverSectionContainer } from '../components/receiver-section/receiver-section.container';
import { RootComponentProps } from "./root.type";
import { useEffect, useRef } from "react";
import { useState } from "react";

import { Composition } from 'atomic-layout'
import { Drawer, useMediaQuery } from "@material-ui/core";

export function RootComponent(props: RootComponentProps) {

    const { initIPFS, setMyName, messages } = props;
    const classes = useRootStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    const messagesContainerRef = useRef<any>(null);

    useEffect(() => {
        if (messagesContainerRef && messagesContainerRef.current) {
            setTimeout(() => {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }, 0);
        }
    }, [messages])

    useEffect(() => {
        initIPFS({});
    }, []);

    const isSmallScreen = useMediaQuery('(max-width: 768px)')

    const chatInputs = <ChatInputsContainer />;

    if (isSmallScreen) {

        return (
            <>
                <div style={{ display: 'none' }}>
                    <LogoContainer />
                </div>

                {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}

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
                        <div
                            style={{
                                background: '#27d29b'
                            }}
                        >
                            <LogoContainer />
                        </div>

                        <div
                            style={{

                                boxShadow: '#cecece 3px 0px 3px'
                            }}
                        >
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

                    <div
                        style={{
                            background: '#27d29b'
                        }}
                    >
                        <LogoContainer />
                    </div>
                    <div
                        style={{
                            background: "#27d29b",
                            filter: "grayscale(0.4)"
                        }}
                    >
                        <ReceiverSectionContainer
                            openDrawer={() => setOpenDrawer(true)}
                            showOpenButton={isSmallScreen}
                        />
                    </div>

                    <div>
                        <Composition
                            height="100%"
                            maxHeight={'calc(100vh - 140px)'}
                            templateRows={'1fr auto'}
                        >
                            <div style={{ overflow: 'auto', }} ref={messagesContainerRef}>
                                <MessagePanelContainer />
                            </div>

                            {chatInputs}

                        </Composition>
                    </div>

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
                        <Identity
                            style={{
                                background: '#27d29b'
                            }}
                        >
                            <LogoContainer />
                        </Identity>
                        <Receiver
                            style={{
                                background: "#27d29b",
                                borderLeft: "2px solid white",
                                filter: "grayscale(0.4)"
                            }}
                        >

                            <ReceiverSectionContainer
                                openDrawer={() => setOpenDrawer(true)}
                                showOpenButton={isSmallScreen}
                            />

                        </Receiver>
                        <Contacts
                            style={{
                                boxShadow: '#cecece 3px 0px 3px'
                            }}
                        >

                            <ContactsListContainer
                                drawerCloseHandler={() => setOpenDrawer(false)}
                            />


                        </Contacts>
                        <Messages
                            style={{ overflow: 'auto' }}
                        >
                            <Composition
                                height="100%"
                                templateRows={'1fr auto'}
                            >

                                <MessagePanelContainer />
                                {chatInputs}

                            </Composition>
                        </Messages>
                    </>
                )
            }


        </Composition>
    );

}