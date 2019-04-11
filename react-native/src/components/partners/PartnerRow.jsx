"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var react_native_responsive_screen_1 = require("react-native-responsive-screen");
var Avatars_1 = require("../profile/img/Avatars");
var lang_1 = require("./lang");
var utils_1 = require("../../utils/utils");
var utilsUi_1 = require("../../utils/utilsUi");
var MessageUnread_1 = require("./MessageUnread");
var React = require("react");
var react_navigation_1 = require("react-navigation");
var react_native_auto_height_image_1 = require("react-native-auto-height-image");
var custom_1 = require("../../config/native-base-theme/variables/custom");
var s = utilsUi_1.font(10);
var m = utilsUi_1.font(15);
var l = utilsUi_1.font(20);
function isLastMessageUnread(message) {
    if (message.lastReadTime === null)
        return true;
    if (message.lastMsgReceivedTime === null)
        return true;
    return message.lastReadTime < message.lastMsgReceivedTime;
}
exports.PartnerRow = function (_a) {
    var message = _a.message, userProfile = _a.userProfile, navigation = _a.navigation;
    var contactProfile = message.author;
    var lastMessageUnread = isLastMessageUnread(message);
    return (<native_base_1.View key={contactProfile.id} style={{ flexDirection: "row" }}>
      <native_base_1.View key={"avatar"} style={{ position: "relative", width: react_native_responsive_screen_1.widthPercentageToDP("50%") }}>
        <react_native_auto_height_image_1.default source={Avatars_1.avatars[contactProfile.avatar]} width={react_native_responsive_screen_1.widthPercentageToDP("50%")}/>
        <native_base_1.Button block rounded success onPress={function () {
        return navigation.navigate("RoomScreen", {
            contactProfile: contactProfile
        });
    }} testID={"contact-" + contactProfile.id} style={{
        backgroundColor: "rgba(255, 153, 0, 0.7)",
        position: "absolute",
        bottom: 10,
        alignSelf: "center"
    }}>
          <native_base_1.Text>{lang_1.default("Contact")}</native_base_1.Text>
        </native_base_1.Button>
      </native_base_1.View>
      <native_base_1.View key={"description"} style={{ width: react_native_responsive_screen_1.widthPercentageToDP("50%"), paddingLeft: 5 }}>
        <native_base_1.View style={{ flexDirection: "row" }} key={"pseudo"}>
          <native_base_1.Text style={{ fontWeight: "bold", fontSize: l }} key={"pseudo"}>
            {contactProfile.pseudo}
          </native_base_1.Text>
          <native_base_1.Icon name={contactProfile.isMale ? "gender-male" : "gender-female"} type="MaterialCommunityIcons" style={{
        color: contactProfile.isMale
            ? custom_1.default.brandPrimary
            : custom_1.default.brandSecondary
    }} fontSize={l}/>
        </native_base_1.View>
        <native_base_1.Text style={{ color: custom_1.default.brandPrimary, fontSize: m }} key={"city"}>
          {contactProfile.city}{" "}
          {utils_1.distanceKm(userProfile.lat, userProfile.lon, contactProfile.lat, contactProfile.lon)}
          km
        </native_base_1.Text>
        <native_base_1.Text style={{ color: custom_1.default.textGreyLight, fontSize: s }} key={"profession"}>
          {contactProfile.profession}
          {" - "}
          {contactProfile.age + lang_1.default("yo")}
        </native_base_1.Text>
        {utilsUi_1.teachRows(contactProfile, s, userProfile.langsToLearn, true)}
        {utilsUi_1.learnRows(contactProfile, s, userProfile.langsToTeach, true)}
        {message.lastMsgReceived && (<native_base_1.View key={"lastMsgReceived"}>
            {lastMessageUnread && (<MessageUnread_1.MessageUnread {...{ contactProfile: contactProfile, userProfile: userProfile, size: m, message: message }} testID={"MessageUnread"}/>)}
            {lastMessageUnread || (<native_base_1.Text style={{ color: custom_1.default.brandPrimary, fontSize: m }} testID={"lastMessageRead"} key={"lastMessageRead"}>
                {lang_1.default("Read message")}
              </native_base_1.Text>)}
            <native_base_1.Text style={{ color: custom_1.default.textGreyLight, fontSize: s }} key={"lastMsgReceivedTime"}>
              {utilsUi_1.formatDuration(message.lastMsgReceivedTime)}
            </native_base_1.Text>
            <native_base_1.Text style={{ color: custom_1.default.textGrey, fontSize: m }} key={"shortFormat"}>
              {utilsUi_1.shortFormat(message.lastMsgReceived, 50)}
            </native_base_1.Text>
          </native_base_1.View>)}
      </native_base_1.View>
    </native_base_1.View>);
};
exports.default = react_navigation_1.withNavigation(exports.PartnerRow);
