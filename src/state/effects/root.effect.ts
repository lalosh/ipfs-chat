import { fork } from "redux-saga/effects";
import { initIpfsEffect } from "./init-ipfs.effect";
import { sendMessageEffect } from "./send-message.effect";
import { setMyNameEffect } from "./set-my-name.effect";


export function* rootSaga() {
    try {

        yield fork(initIpfsEffect);
        yield fork(setMyNameEffect);
        yield fork(sendMessageEffect);

    } catch (error) {
        console.error(error);
    }
}