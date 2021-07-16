import { ChatsInputs } from "../components/chat-inputs/chat-inputs";
import { ContactsList } from "../components/contacts-list/contacts-list";
import { MessagesPanel } from "../components/messages-panel/messages-panel";
import { SideNav } from "../components/side-nav/side-nav";
import { TopNav } from "../components/top-nav/top-nav";
import { useRootStyles } from "./root.style";
import { LogoContainer } from '../components/logo/logo';
import { ProfileAndSearch } from '../components/profile-and-search/profile-and-search';
import { ReceiverContainer } from '../components/receiver-container/receiver-container';

export function RootComponent() {

    const classes = useRootStyles();


    return (
        <>
            <div className={classes.root}>

                <div className={classes.topNavContainer}>
                    {/* <TopNav /> */}
                </div>


                <div className={classes.logoContainer}>
                    <LogoContainer />
                </div>

                <div className={classes.profileAndSearch}>
                    <ProfileAndSearch />
                </div>

                <div className={classes.receiverContainer}>
                    <ReceiverContainer />
                </div>

                <div className={classes.sideNavContainer}>
                    <SideNav />
                </div>
                <div className={classes.contactsListContainer}>
                    <ContactsList />
                </div>
                <div className={classes.messagesPanelContainer}>
                    <MessagesPanel />
                </div>
                <div className={classes.chatInputsContainer}>
                    <ChatsInputs />
                </div>

            </div>
        </>
    );
}