import { AppActionCreator } from "../../types/actions.type";

export const SET_MY_NAME = 'SET_MY_NAME';

export interface SetMyNameAction {
    type: typeof SET_MY_NAME,
    name: string,
}

export type SetMyNameActionCreator = AppActionCreator<SetMyNameAction>;


export const setMyName: SetMyNameActionCreator =
    (params) => ({
        type: SET_MY_NAME,
        ...params,
    });