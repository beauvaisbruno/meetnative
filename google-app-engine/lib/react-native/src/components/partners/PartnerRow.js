"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const native_base_1 = require("native-base");
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const Avatars_1 = require("../profile/img/Avatars");
const lang_1 = __importDefault(require("./lang"));
const utils_1 = require("../../utils/utils");
const utilsUi_1 = require("../../utils/utilsUi");
const MessageUnread_1 = require("./MessageUnread");
const React = __importStar(require("react"));
const react_navigation_1 = require("react-navigation");
const react_native_auto_height_image_1 = __importDefault(
  require("react-native-auto-height-image")
);
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
const s = utilsUi_1.font(10);
const m = utilsUi_1.font(15);
const l = utilsUi_1.font(20);
function isLastMessageUnread(message) {
  if (message.lastReadTime === null) return true;
  if (message.lastMsgReceivedTime === null) return true;
  return message.lastReadTime < message.lastMsgReceivedTime;
}
exports.PartnerRow = ({ message, userProfile, navigation }) => {
  const contactProfile = message.author;
  const lastMessageUnread = isLastMessageUnread(message);
  return React.createElement(
    native_base_1.View,
    { key: contactProfile.id, style: { flexDirection: "row" } },
    React.createElement(
      native_base_1.View,
      {
        key: "avatar",
        style: {
          position: "relative",
          width: react_native_responsive_screen_1.widthPercentageToDP("50%")
        }
      },
      React.createElement(react_native_auto_height_image_1.default, {
        source: Avatars_1.avatars[contactProfile.avatar],
        width: react_native_responsive_screen_1.widthPercentageToDP("50%")
      }),
      React.createElement(
        native_base_1.Button,
        {
          block: true,
          rounded: true,
          success: true,
          onPress: () =>
            navigation.navigate("RoomScreen", {
              contactProfile
            }),
          testID: "contact-" + contactProfile.id,
          style: {
            backgroundColor: "rgba(255, 153, 0, 0.7)",
            position: "absolute",
            bottom: 10,
            alignSelf: "center"
          }
        },
        React.createElement(native_base_1.Text, null, lang_1.default("Contact"))
      )
    ),
    React.createElement(
      native_base_1.View,
      {
        key: "description",
        style: {
          width: react_native_responsive_screen_1.widthPercentageToDP("50%"),
          paddingLeft: 5
        }
      },
      React.createElement(
        native_base_1.View,
        { style: { flexDirection: "row" }, key: "pseudo" },
        React.createElement(
          native_base_1.Text,
          { style: { fontWeight: "bold", fontSize: l }, key: "pseudo" },
          contactProfile.pseudo
        ),
        React.createElement(native_base_1.Icon, {
          name: contactProfile.isMale ? "gender-male" : "gender-female",
          type: "MaterialCommunityIcons",
          style: {
            color: contactProfile.isMale
              ? custom_1.default.brandPrimary
              : custom_1.default.brandSecondary
          },
          fontSize: l
        })
      ),
      React.createElement(
        native_base_1.Text,
        {
          style: { color: custom_1.default.brandPrimary, fontSize: m },
          key: "city"
        },
        contactProfile.city,
        " ",
        utils_1.distanceKm(
          userProfile.lat,
          userProfile.lon,
          contactProfile.lat,
          contactProfile.lon
        ),
        "km"
      ),
      React.createElement(
        native_base_1.Text,
        {
          style: { color: custom_1.default.textGreyLight, fontSize: s },
          key: "profession"
        },
        contactProfile.profession,
        " - ",
        contactProfile.age + lang_1.default("yo")
      ),
      utilsUi_1.teachRows(contactProfile, s, userProfile.langsToLearn, true),
      utilsUi_1.learnRows(contactProfile, s, userProfile.langsToTeach, true),
      message.lastMsgReceived &&
        React.createElement(
          native_base_1.View,
          { key: "lastMsgReceived" },
          lastMessageUnread &&
            React.createElement(
              MessageUnread_1.MessageUnread,
              Object.assign(
                {},
                { contactProfile, userProfile, size: m, message },
                { testID: "MessageUnread" }
              )
            ),
          lastMessageUnread ||
            React.createElement(
              native_base_1.Text,
              {
                style: { color: custom_1.default.brandPrimary, fontSize: m },
                testID: "lastMessageRead",
                key: "lastMessageRead"
              },
              lang_1.default("Read message")
            ),
          React.createElement(
            native_base_1.Text,
            {
              style: { color: custom_1.default.textGreyLight, fontSize: s },
              key: "lastMsgReceivedTime"
            },
            utilsUi_1.formatDuration(message.lastMsgReceivedTime)
          ),
          React.createElement(
            native_base_1.Text,
            {
              style: { color: custom_1.default.textGrey, fontSize: m },
              key: "shortFormat"
            },
            utilsUi_1.shortFormat(message.lastMsgReceived, 50)
          )
        )
    )
  );
};
exports.default = react_navigation_1.withNavigation(exports.PartnerRow);
//# sourceMappingURL=PartnerRow.js.map
