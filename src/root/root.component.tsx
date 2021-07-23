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



export function RootComponent(props: RootComponentProps) {

    const { initIPFS, setMyName } = props;
    const classes = useRootStyles();

    useEffect(() => {
        initIPFS({});
    }, []);


    return (
        <div className={classes.root}>

            <div className={classes.topNavContainer}>
            </div>


            <div className={classes.logoContainer}>
                <LogoContainer />
            </div>

            <div className={classes.profileAndSearch}>
                <ProfileAndSearchContainer />
            </div>

            <div className={classes.receiverContainer}>
                <ReceiverSectionContainer />
            </div>

            <div className={classes.sideNavContainer}>
                <SideNav />
            </div>

            <div className={classes.contactsListContainer}>
                <ContactsListContainer />
            </div>

            <div className={classes.messagesPanelContainer}>
                <MessagePanelContainer />
            </div>

            <div className={classes.chatInputsContainer}>
                <ChatInputsContainer />
            </div>

        </div>
    );
}