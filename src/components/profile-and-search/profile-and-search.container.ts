import { connect } from "react-redux";
import { setMyName } from "../../state/actions/set-my-name";
import { RootState } from "../../state/reducers/root.reducer";
import { ProfileAndSearch } from "./profile-and-search";

function mapStateToProps(state: RootState) {

    return {
        myName: state.myName,
    }
}

const mapActionsToProps = {
    setMyName
}

export const ProfileAndSearchContainer = connect(
    mapStateToProps,
    mapActionsToProps
)(
    ProfileAndSearch
);