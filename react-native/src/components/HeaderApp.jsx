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
var React = require("react");
var native_base_1 = require("native-base");
var react_navigation_1 = require("react-navigation");
var react_redux_1 = require("react-redux");
var lang_1 = require("./lang");
var react_native_1 = require("react-native");
var HeaderApp = /** @class */ (function (_super) {
    __extends(HeaderApp, _super);
    function HeaderApp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderApp.prototype.render = function () {
        var _this = this;
        return (<native_base_1.Header>
        <native_base_1.Left>
          <native_base_1.Button transparent testID={"menuButton"} onPress={function () { return _this.openMenu(); }}>
            <native_base_1.Icon name="menu"/>
          </native_base_1.Button>
        </native_base_1.Left>
        <native_base_1.Body>
          <native_base_1.Title>{this.props.headerTitle}</native_base_1.Title>
        </native_base_1.Body>
        <native_base_1.Right />
      </native_base_1.Header>);
    };
    HeaderApp.prototype.openMenu = function () {
        if (this.props.userProfile === null) {
            react_native_1.Alert.alert(lang_1.default("Save your profile info before to start"));
        }
        else
            this.props.navigation.openDrawer();
    };
    return HeaderApp;
}(React.Component));
exports.HeaderApp = HeaderApp;
exports.mapStateToProps = function (state) { return ({
    userProfile: state.profile.profileLoad.data
}); };
exports.default = react_redux_1.connect(exports.mapStateToProps)(react_navigation_1.withNavigation(HeaderApp));
