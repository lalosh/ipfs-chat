import { connect } from "react-redux";
import { initIPFS } from "../state/actions/init-ipfs";
import { setMyName } from "../state/actions/set-my-name";
import { RootState } from "../state/reducers/root.reducer";
import { RootComponent } from "./root.component";

function mapStateToProps(state: RootState) {

    return {
        messages: state.messages,
    }
}


const mapActionToProps = {
    initIPFS,
}

export const RootContainer =
    connect(
        mapStateToProps,
        mapActionToProps
    )(
        RootComponent
    );