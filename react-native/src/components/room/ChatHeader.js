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
const Avatars_1 = require("../profile/img/Avatars");
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const react_native_auto_height_image_1 = __importDefault(require("react-native-auto-height-image"));
const utils_1 = require("../../utils/utils");
const utilsUi_1 = require("../../utils/utilsUi");
const lang_1 = __importDefault(require("./lang"));
const custom_1 = __importDefault(require("../../config/native-base-theme/variables/custom"));
class ChatHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({ headerOpen: false }, props.storyState);
    }
    render() {
        const s = utilsUi_1.font(10);
        const m = utilsUi_1.font(15);
        const l = utilsUi_1.font(20);
        const xl = utilsUi_1.font(27);
        const profile = this.props.profile;
        const user = this.props.user;
        return (React.createElement(native_base_1.View, null,
            !this.state.headerOpen && (React.createElement(native_base_1.View, { style: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderBottomColor: custom_1.default.borderColor
                } },
                React.createElement(native_base_1.View, { style: {
                        flexDirection: "row"
                    } },
                    React.createElement(react_native_auto_height_image_1.default, { source: Avatars_1.avatars[profile.avatar], width: react_native_responsive_screen_1.widthPercentageToDP("13%") }),
                    React.createElement(native_base_1.Text, { style: { marginLeft: 5, fontWeight: "bold", fontSize: xl } }, profile.pseudo)),
                React.createElement(native_base_1.Button, { block: true, transparent: true, onPress: () => this.handleSetHeaderVisible(true), testID: "headerVisibleBtn" },
                    React.createElement(native_base_1.Icon, { name: "plus-circle", type: "FontAwesome", fontSize: 10, style: { marginLeft: 0, marginRight: 0, fontSize: 10 } }),
                    React.createElement(native_base_1.Text, { style: { fontSize: s, paddingLeft: 5, paddingRight: 5 } }, lang_1.default("Info"))))),
            this.state.headerOpen && (React.createElement(native_base_1.View, { style: {
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: custom_1.default.borderColor
                } },
                React.createElement(react_native_auto_height_image_1.default, { source: Avatars_1.avatars[profile.avatar], width: react_native_responsive_screen_1.widthPercentageToDP("50%") }),
                React.createElement(native_base_1.View, { style: { paddingLeft: 5, width: react_native_responsive_screen_1.widthPercentageToDP("50%") } },
                    React.createElement(native_base_1.View, { style: {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        } },
                        React.createElement(native_base_1.View, { style: { flexDirection: "row" } },
                            React.createElement(native_base_1.Text, { style: { fontWeight: "bold", fontSize: l } }, profile.pseudo),
                            React.createElement(native_base_1.Icon, { name: profile.isMale ? "gender-male" : "gender-female", type: "MaterialCommunityIcons", style: {
                                    color: profile.isMale
                                        ? custom_1.default.brandPrimary
                                        : custom_1.default.brandSecondary
                                }, fontSize: l })),
                        React.createElement(native_base_1.Button, { block: true, transparent: true, onPress: () => this.handleSetHeaderVisible(false), testID: "headerVisibleBtn", style: Object.assign({}, utilsUi_1.noMarPad, { height: m + 5 }) },
                            React.createElement(native_base_1.Icon, { name: "close-circle-outline", type: "MaterialCommunityIcons", style: Object.assign({}, utilsUi_1.noMarPad, { fontSize: m, color: custom_1.default.brandDanger }) }))),
                    React.createElement(native_base_1.Text, { style: { color: custom_1.default.brandPrimary, fontSize: m } },
                        profile.city,
                        " ",
                        utils_1.distanceKm(user.lat, user.lon, profile.lat, profile.lon),
                        "km"),
                    React.createElement(native_base_1.Text, { style: { color: custom_1.default.textGreyLight, fontSize: s } },
                        profile.profession,
                        " - ",
                        profile.age + lang_1.default("yo")),
                    React.createElement(native_base_1.Text, { style: { fontWeight: "bold", fontSize: s } }, lang_1.default("Speak")),
                    utilsUi_1.teachRows(user, s, profile.langsToLearn),
                    React.createElement(native_base_1.Text, { style: { fontWeight: "bold", fontSize: s } }, lang_1.default("Learn")),
                    utilsUi_1.learnRows(user, s, profile.langsToTeach))))));
    }
    handleSetHeaderVisible(headerOpen) {
        this.setState({ headerOpen });
    }
}
exports.ChatHeader = ChatHeader;
exports.default = ChatHeader;
