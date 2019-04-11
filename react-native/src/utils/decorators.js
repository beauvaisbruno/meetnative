"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const rootReducers_1 = require("../rootReducers");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const react_1 = __importDefault(require("react"));
const react_navigation_1 = require("react-navigation");
const react_redux_1 = require("react-redux");
const native_base_1 = require("native-base");
const mocks_1 = require("./mocks");
const test_utils_1 = require("react-apollo/test-utils");
exports.mockStore = redux_1.createStore(rootReducers_1.rootReducers, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware()));
exports.mockBase = (children) => class MockBase extends react_1.default.Component {
    render() {
        return react_1.default.createElement(native_base_1.Root, null, children);
    }
};
exports.MockBaseAndNavigator = ({ children }) => {
    const Container = react_navigation_1.createAppContainer(react_navigation_1.createSwitchNavigator({ screen: exports.mockBase(children) }, { initialRouteName: "screen" }));
    return react_1.default.createElement(Container, null);
};
exports.storeBaseAndNavigatorDecorator = (story) => (react_1.default.createElement(react_redux_1.Provider, { store: exports.mockStore },
    react_1.default.createElement(exports.MockBaseAndNavigator, null, story())));
exports.baseDecorator = (story) => react_1.default.createElement(native_base_1.Root, null, story());
exports.navigatorDecorator = (story) => (react_1.default.createElement(exports.MockBaseAndNavigator, null, story()));
exports.storeDecorator = (story) => (react_1.default.createElement(react_redux_1.Provider, { store: exports.mockStore }, story()));
exports.MockedApollo = ({ children, mocks }) => {
    const formatedMocks = [];
    mocks.forEach(mock => {
        const formatedMock = {
            request: {
                query: mock.q,
                variables: mock.v
            },
            result: {
                data: mock.r,
                errors: mock.e ? [{ message: "Mocked Error" }] : undefined
            }
        };
        formatedMocks.push(formatedMock);
    });
    return (react_1.default.createElement(test_utils_1.MockedProvider, Object.assign({}, {
        mocks: formatedMocks,
        cache: mocks_1.createCache()
    }), children));
};
