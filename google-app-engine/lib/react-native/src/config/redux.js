"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const redux_saga_1 = __importDefault(require("redux-saga"));
const redux_1 = require("redux");
const rootReducers_1 = require("../rootReducers");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const rootSaga_1 = __importDefault(require("../rootSaga"));
const sagaMiddleware = redux_saga_1.default();
exports.store = redux_1.createStore(
  rootReducers_1.rootReducers,
  redux_devtools_extension_1.composeWithDevTools(
    redux_1.applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga_1.default);
//# sourceMappingURL=redux.js.map
