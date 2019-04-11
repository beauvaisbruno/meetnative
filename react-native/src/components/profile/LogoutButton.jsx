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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var native_base_1 = require("native-base");
var react_redux_1 = require("react-redux");
var profileReducer_1 = require("./profileReducer");
var reducerHelper_1 = require("../../utils/reducerHelper");
var lang_1 = require("./lang");
var LogoutButton = /** @class */ (function (_super) {
    __extends(LogoutButton, _super);
    function LogoutButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogoutButton.prototype.render = function () {
        var _this = this;
        return (<native_base_1.View padder>
        <native_base_1.Button testID={"logoutButton"} block rounded primary onPress={function () { return _this.props.doLogout(); }}>
          <native_base_1.Icon name="logout" type="AntDesign" color="white" fontSize={30}/>
          <native_base_1.Text>{lang_1.default("Logout")}</native_base_1.Text>
        </native_base_1.Button>
      </native_base_1.View>);
    };
    return LogoutButton;
}(react_1.Component));
exports.LogoutButton = LogoutButton;
exports.mapStateToProps = function (state) {
    return __assign({}, state.profile.profileLogout);
};
exports.mapDispatchToProps = function (dispatch) {
    return {
        doLogout: function () { return dispatch(reducerHelper_1.fetchingAction(profileReducer_1.ProfileActions.profileLogout)); }
    };
};
exports.default = react_redux_1.connect(exports.mapStateToProps, exports.mapDispatchToProps)(LogoutButton);
