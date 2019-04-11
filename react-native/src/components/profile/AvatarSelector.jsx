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
var native_base_1 = require("native-base");
var React = require("react");
var react_native_1 = require("react-native");
var Avatars_1 = require("./img/Avatars");
var react_native_responsive_screen_1 = require("react-native-responsive-screen");
var react_native_auto_height_image_1 = require("react-native-auto-height-image");
var react_navigation_1 = require("react-navigation");
var AvatarSelector = /** @class */ (function (_super) {
    __extends(AvatarSelector, _super);
    function AvatarSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatarSelector.prototype.componentWillUnmount = function () {
        if (this.navListener)
            this.navListener.remove();
    };
    AvatarSelector.prototype.componentDidMount = function () {
        var _this = this;
        this.navListener = this.props.navigation.addListener("willFocus", function (payload) {
            if (_this.props.navigation.state.params &&
                _this.props.navigation.state.params.avatar) {
                _this.props.onChange(_this.props.navigation.state.params.avatar);
                _this.props.navigation.state.params.avatar = undefined;
            }
        });
    };
    AvatarSelector.prototype.render = function () {
        var _this = this;
        return (<native_base_1.View style={{
            textAlignVertical: "top",
            justifyContent: "center",
            alignItems: "center"
        }}>
        <native_base_1.View style={{ textAlignVertical: "top", flex: 1, flexDirection: "row" }}>
          <native_base_1.Text style={{ textAlignVertical: "top", marginRight: 10 }}>
            Avatar
          </native_base_1.Text>
          <react_native_1.TouchableHighlight testID={"TouchableHighlight"} onPress={function () {
            _this.props.navigation.navigate("AvatarScreen");
        }}>
            <react_native_auto_height_image_1.default source={Avatars_1.avatars[this.props.value]} width={react_native_responsive_screen_1.widthPercentageToDP("45%")}/>
          </react_native_1.TouchableHighlight>
        </native_base_1.View>
      </native_base_1.View>);
    };
    return AvatarSelector;
}(React.Component));
exports.AvatarSelector = AvatarSelector;
exports.default = react_navigation_1.withNavigation(AvatarSelector);
