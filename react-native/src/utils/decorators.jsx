"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var rootReducers_1 = require("../rootReducers");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var react_1 = require("react");
var react_navigation_1 = require("react-navigation");
var react_redux_1 = require("react-redux");
var native_base_1 = require("native-base");
var mocks_1 = require("./mocks");
var test_utils_1 = require("react-apollo/test-utils");
exports.mockStore = redux_1.createStore(rootReducers_1.rootReducers, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware()));
exports.mockBase = function (children) {
    return /** @class */ (function (_super) {
        __extends(MockBase, _super);
        function MockBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MockBase.prototype.render = function () {
            return <native_base_1.Root>{children}</native_base_1.Root>;
        };
        return MockBase;
    }(react_1.default.Component));
};
exports.MockBaseAndNavigator = function (_a) {
    var children = _a.children;
    var Container = react_navigation_1.createAppContainer(react_navigation_1.createSwitchNavigator({ screen: exports.mockBase(children) }, { initialRouteName: "screen" }));
    return <Container />;
};
exports.storeBaseAndNavigatorDecorator = function (story) { return (<react_redux_1.Provider store={exports.mockStore}>
    <exports.MockBaseAndNavigator>{story()}</exports.MockBaseAndNavigator>
  </react_redux_1.Provider>); };
exports.baseDecorator = function (story) { return <native_base_1.Root>{story()}</native_base_1.Root>; };
exports.navigatorDecorator = function (story) { return (<exports.MockBaseAndNavigator>{story()}</exports.MockBaseAndNavigator>); };
exports.storeDecorator = function (story) { return (<react_redux_1.Provider store={exports.mockStore}>{story()}</react_redux_1.Provider>); };
exports.MockedApollo = function (_a) {
    var children = _a.children, mocks = _a.mocks;
    var formatedMocks = [];
    mocks.forEach(function (mock) {
        // erros: [{ message: "Error!" }]
        var formatedMock = {
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
    return (<test_utils_1.MockedProvider {...{
        mocks: formatedMocks,
        cache: mocks_1.createCache()
    }}>
      {children}
    </test_utils_1.MockedProvider>);
};
