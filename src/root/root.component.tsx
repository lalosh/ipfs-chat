import { ChatInputsContainer } from "../components/chat-inputs/chat-inputs.container";
import { ContactsListContainer } from "../components/contacts-list/contacts-list.container";
import { MessagePanelContainer } from "../components/messages-panel/messages-panel.container";
import { SideNav } from "../components/side-nav/side-nav";
import { useRootStyles } from "./root.style";
import { LogoContainer } from '../components/logo/logo';
import { ProfileAndSearchContainer } from '../components/profile-and-search/profile-and-search.container';
import { ReceiverSectionContainer } from '../components/receiver-section/receiver-section.container';
import { RootComponentProps } from "./root.type";
import { useEffect } from "react";
import { useState } from "react";

import { Composition } from 'atomic-layout'
import { Drawer, useMediaQuery } from "@material-ui/core";

export function RootComponent(props: RootComponentProps) {

    const { initIPFS, setMyName } = props;
    const classes = useRootStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        initIPFS({});
    }, []);

    const isSmallScreen = useMediaQuery('(max-width: 768px)')

    const logoComponent = <LogoContainer />

    if (isSmallScreen) {

        return (
            <>
                <div style={{ display: 'none' }}>
                    {logoComponent}
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
                        width="60vw"
                    >
                        <div
                            style={{
                                background: '#27d29b'
                            }}
                        >
                            {logoComponent}
                        </div>

                        <div
                            style={{

                                boxShadow: '#cecece 3px 0px 3px'
                            }}
                        >
                            <ContactsListContainer />

                        </div>
                    </Composition>
                </Drawer>

                <Composition
                    templateRows={'70px 1fr'}
                    height={'100vh'}
                >

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
                            templateRows={'1fr auto'}
                        >

                            <MessagePanelContainer />
                            <ChatInputsContainer />

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
                            {logoComponent}
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
                            <ContactsListContainer />

                        </Contacts>
                        <Messages>
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