import { Button, Icon, Text, View } from "native-base";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { avatars } from "../profile/img/Avatars";
import lang from "./lang";
import { distanceKm } from "../../utils/utils";
import {
  font,
  formatDuration,
  learnRows,
  shortFormat,
  teachRows
} from "../../utils/utilsUi";
import { MessageUnread } from "./MessageUnread";
import * as React from "react";
import { ILastMessageProfiles } from "./partnersTypes";
import { IProfile } from "../../rootReducers";
import { NavigationScreenProp, withNavigation } from "react-navigation";
import AutoHeightImage from "react-native-auto-height-image";
import custom from "../../config/native-base-theme/variables/custom";
const s = font(10);
const m = font(15);
const l = font(20);

function isLastMessageUnread(message: ILastMessageProfiles): boolean {
  if (message.lastReadTime === null) return true;
  if (message.lastMsgReceivedTime === null) return true;
  return message.lastReadTime! < message.lastMsgReceivedTime!;
}
export const PartnerRow = ({
  message,
  userProfile,
  navigation
}: {
  message: ILastMessageProfiles;
  userProfile: IProfile;
  navigation: NavigationScreenProp<any>;
}) => {
  const contactProfile = message.author;
  const lastMessageUnread = isLastMessageUnread(message);
  return (
    <View key={contactProfile.id} style={{ flexDirection: "row" }}>
      <View key={"avatar"} style={{ position: "relative", width: wp("50%") }}>
        <AutoHeightImage
          source={avatars[contactProfile.avatar] as number}
          width={wp("50%")}
        />
        <Button
          block
          rounded
          success
          onPress={() =>
            navigation.navigate("RoomScreen", {
              contactProfile
            })
          }
          testID={"contact-" + contactProfile.id}
          style={{
            backgroundColor: "rgba(255, 153, 0, 0.7)",
            position: "absolute",
            bottom: 10,
            alignSelf: "center"
          }}
        >
          <Text>{lang("Contact")}</Text>
        </Button>
      </View>
      <View key={"description"} style={{ width: wp("50%"), paddingLeft: 5 }}>
        <View style={{ flexDirection: "row" }} key={"pseudo"}>
          <Text style={{ fontWeight: "bold", fontSize: l }} key={"pseudo"}>
            {contactProfile.pseudo}
          </Text>
          <Icon
            name={contactProfile.isMale ? "gender-male" : "gender-female"}
            type="MaterialCommunityIcons"
            style={{
              color: contactProfile.isMale
                ? custom.brandPrimary
                : custom.brandSecondary
            }}
            fontSize={l}
          />
        </View>
        <Text style={{ color: custom.brandPrimary, fontSize: m }} key={"city"}>
          {contactProfile.city}{" "}
          {distanceKm(
            userProfile.lat!,
            userProfile.lon!,
            contactProfile.lat!,
            contactProfile.lon!
          )}
          km
        </Text>
        <Text
          style={{ color: custom.textGreyLight, fontSize: s }}
          key={"profession"}
        >
          {contactProfile.profession}
          {" - "}
          {contactProfile.age + lang("yo")}
        </Text>
        {teachRows(contactProfile, s, userProfile.langsToLearn, true)}
        {learnRows(contactProfile, s, userProfile.langsToTeach, true)}
        {message.lastMsgReceived && (
          <View key={"lastMsgReceived"}>
            {lastMessageUnread && (
              <MessageUnread
                {...{ contactProfile, userProfile, size: m, message }}
                testID={"MessageUnread"}
              />
            )}
            {lastMessageUnread || (
              <Text
                style={{ color: custom.brandPrimary, fontSize: m }}
                testID={"lastMessageRead"}
                key={"lastMessageRead"}
              >
                {lang("Read message")}
              </Text>
            )}
            <Text
              style={{ color: custom.textGreyLight, fontSize: s }}
              key={"lastMsgReceivedTime"}
            >
              {formatDuration(message.lastMsgReceivedTime!)}
            </Text>
            <Text
              style={{ color: custom.textGrey, fontSize: m }}
              key={"shortFormat"}
            >
              {shortFormat(message.lastMsgReceived!, 50)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default withNavigation(PartnerRow);
