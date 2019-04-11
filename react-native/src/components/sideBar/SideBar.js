"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const native_base_1 = require("native-base");
const utils_1 = require("../../utils/utils");
const LogoutButton_1 = __importDefault(require("../profile/LogoutButton"));
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const react_native_auto_height_image_1 = __importDefault(require("react-native-auto-height-image"));
const custom_1 = __importDefault(require("../../config/native-base-theme/variables/custom"));
exports.renderRows = (data, navigation) => {
    return (React.createElement(native_base_1.ListItem, { onPress: () => {
            navigation.navigate(data.key);
            navigation.closeDrawer();
        }, button: true, testID: data.key },
        React.createElement(native_base_1.Text, { style: {
                color: navigation.state.routeName === data.key
                    ? custom_1.default.textGreyLight
                    : custom_1.default.textGrey
            } }, data.menuLabel)));
};
const SideBar = (props) => (React.createElement(native_base_1.Container, null,
    React.createElement(native_base_1.Content, null,
        React.createElement(react_native_auto_height_image_1.default, { source: require("../login/img/header.png"), width: react_native_responsive_screen_1.widthPercentageToDP("80%") }),
        React.createElement(native_base_1.List, { dataArray: utils_1.objsToArrayWithKey(props.routes), renderRow: data => exports.renderRows(data, props.navigation) }),
        React.createElement(LogoutButton_1.default, null))));
exports.default = SideBar;
