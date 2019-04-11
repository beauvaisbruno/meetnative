import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { rootReducers } from "../rootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "../rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
