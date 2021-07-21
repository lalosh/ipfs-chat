import { SetMyNameAction, SET_MY_NAME } from "../actions/set-my-name";

export function myNameReducer(state: string = '', action: SetMyNameAction) {

    switch (action.type) {

        case SET_MY_NAME:
            return action.name;

        default:
            return state;
    }
}