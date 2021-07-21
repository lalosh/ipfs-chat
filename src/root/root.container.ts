import { connect } from "react-redux";
import { initIPFS } from "../state/actions/init-ipfs";
import { setMyName } from "../state/actions/set-my-name";
import { RootState } from "../state/reducers/root.reducer";
import { RootComponent } from "./root.component";

function mapStateToProps(state: RootState) {

    return {
        
    }
 }


const mapActionToProps = {
    initIPFS,
    setMyName
}

export const RootContainer = connect(mapStateToProps, mapActionToProps)(RootComponent)