import { IProfile } from "../../rootReducers";
import * as React from "react";
import { Button, Content, Icon, Text, View } from "native-base";
import { avatars } from "../profile/img/Avatars";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AutoHeightImage from "react-native-auto-height-image";
import { distanceKm } from "../../utils/utils";
import { font, learnRows, noMarPad, teachRows } from "../../utils/utilsUi";
import lang from "./lang";
import custom from "../../config/native-base-theme/variables/custom";

export type IProps = {
  profile: IProfile;
  user: IProfile;
  storyState?: object;
};
export interface IState {
  headerOpen: boolean;
}

export class ChatHeader extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      headerOpen: false,
      ...props.storyState
    };
  }
  render() {
    const s = font(10);
    const m = font(15);
    const l = font(20);
    const xl = font(27);
    const profile = this.props.profile;
    const user = this.props.user;
    return (
      <View>
        {!this.state.headerOpen && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: custom.borderColor
            }}
          >
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <AutoHeightImage
                source={avatars[profile.avatar] as number}
                width={wp("13%")}
              />
              <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: xl }}>
                {profile.pseudo}
              </Text>
            </View>
            <Button
              block
              transparent
              onPress={() => this.handleSetHeaderVisible(true)}
              testID={"headerVisibleBtn"}
            >
              <Icon
                name="plus-circle"
                type="FontAwesome"
                fontSize={10}
                style={{ marginLeft: 0, marginRight: 0, fontSize: 10 }}
              />
              <Text style={{ fontSize: s, paddingLeft: 5, paddingRight: 5 }}>
                {lang("Info")}
              </Text>
            </Button>
          </View>
        )}
        {this.state.headerOpen && (
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: custom.borderColor
            }}
          >
            <AutoHeightImage
              source={avatars[profile.avatar] as number}
              width={wp("50%")}
            />
            <View style={{ paddingLeft: 5, width: wp("50%") }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontWeight: "bold", fontSize: l }}>
                    {profile.pseudo}
                  </Text>
                  <Icon
                    name={profile.isMale ? "gender-male" : "gender-female"}
                    type="MaterialCommunityIcons"
                    style={{
                      color: profile.isMale
                        ? custom.brandPrimary
                        : custom.brandSecondary
                    }}
                    fontSize={l}
                  />
                </View>
                <Button
                  block
                  transparent
                  onPress={() => this.handleSetHeaderVisible(false)}
                  testID={"headerVisibleBtn"}
                  style={{ ...noMarPad, height: m + 5 }}
                >
                  <Icon
                    name="close-circle-outline"
                    type="MaterialCommunityIcons"
                    style={{
                      ...noMarPad,
                      fontSize: m,
                      color: custom.brandDanger
                    }}
                  />
                </Button>
              </View>
              <Text style={{ color: custom.brandPrimary, fontSize: m }}>
                {profile.city}{" "}
                {distanceKm(user.lat!, user.lon!, profile.lat!, profile.lon!)}km
              </Text>
              <Text style={{ color: custom.textGreyLight, fontSize: s }}>
                {profile.profession}
                {" - "}
                {profile.age + lang("yo")}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: s }}>
                {lang("Speak")}
              </Text>
              {teachRows(user, s, profile.langsToLearn)}
              <Text style={{ fontWeight: "bold", fontSize: s }}>
                {lang("Learn")}
              </Text>
              {learnRows(user, s, profile.langsToTeach)}
            </View>
          </View>
        )}
      </View>
    );
  }
  private handleSetHeaderVisible(headerOpen: boolean) {
    this.setState({ headerOpen });
  }
}

export default ChatHeader;
