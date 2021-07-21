import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers/root.reducer";
import createSaga from 'redux-saga';
import { rootSaga } from "./effects/root.effect";

declare var window: any;


const sagaMiddleWare = createSaga();

const composer = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWares = applyMiddleware(sagaMiddleWare);

export const store = createStore(rootReducer, composer(middleWares));

sagaMiddleWare.run(rootSaga);