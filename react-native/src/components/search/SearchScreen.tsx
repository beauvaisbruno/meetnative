import * as React from "react";
import { Button, Icon, Spinner, Text, View } from "native-base";
import PageTemplate from "../PageTemplate";
import { connect } from "react-redux";
import lang from "./lang";
import { IApplicationState, IProfile } from "../../rootReducers";
import { Dispatch } from "redux";
import { fetchingAction } from "../../utils/reducerHelper";
import { ISearchState, SearchActions } from "./searchReducer";
import {
  NavigationEventSubscription,
  NavigationInjectedProps,
  withNavigation
} from "react-navigation";
import { avatars } from "../profile/img/Avatars";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AutoHeightImage from "react-native-auto-height-image";
import { distanceKm } from "../../utils/utils";
import { font, learnRows, teachRows } from "../../utils/utilsUi";
import custom from "../../config/native-base-theme/variables/custom";
import Loading from "../../utils/Loading";

export type IProps = ISearchState &
  NavigationInjectedProps & {
    doSearchProfile: () => void;
    userProfile: IProfile;
  };

export class SearchScreen extends React.Component<IProps> {
  navListener: NavigationEventSubscription | undefined;
  public componentWillUnmount() {
    if (this.navListener)
      this.navListener.remove();
  }
  public componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.props.doSearchProfile();
      }
    );
  }

  render() {
    const { fetching, error, data } = this.props.searchProfiles;
    const {
      lat: userLat,
      lon: userLon,
      langsToTeach: userTeach,
      langsToLearn: userLearn
    } = this.props.userProfile;

    const rows: JSX.Element[] = [];
    if (data) {
      const s = font(10);
      const m = font(15);
      const l = font(20);
      data.forEach((profile: IProfile) => {
        rows.push(
          <View key={profile.id} style={{ flexDirection: "row" }}>
            <View
              key={"avatar"}
              style={{ position: "relative", width: wp("50%") }}
            >
              <AutoHeightImage
                source={avatars[profile.avatar] as number}
                width={wp("50%")}
              />
              <Button
                block
                rounded
                success
                onPress={() =>
                  this.props.navigation.navigate("RoomScreen", {
                    contactProfile: profile
                  })
                }
                testID={"contact-" + profile.id}
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
            <View
              key={"description"}
              style={{ width: wp("50%"), paddingLeft: 5 }}
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
              <Text style={{ color: custom.brandPrimary, fontSize: m }}>
                {profile.city}{" "}
                {distanceKm(userLat!, userLon!, profile.lat!, profile.lon!)}km
              </Text>
              <Text style={{ color: custom.textGreyLight, fontSize: s }}>
                {profile.profession}
                {" - "}
                {profile.age + lang("yo")}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: s }}>
                {lang("Speak")}
              </Text>
              {teachRows(profile, s, userLearn)}
              <Text style={{ fontWeight: "bold", fontSize: s }}>
                {lang("Learn")}
              </Text>
              {learnRows(profile, s, userTeach)}
            </View>
          </View>
        );
      });
    }
    return (
      <View>
        {fetching && <Loading />}
        {error && (
          <Text style={{ color: custom.brandDanger }}>
            {lang("Impossible to load profiles")}
          </Text>
        )}
        {rows.length > 0 && (fetching || rows)}
        {rows.length === 0 &&
          (fetching || (
            <View>
              <Text style={{ fontStyle: "italic", textAlign: "center" }}>
                {lang("No user match your profile")}
              </Text>
            </View>
          ))}
      </View>
    );
  }
}

export const mapStateToProps = (state: IApplicationState) => ({
  ...state.search,
  userProfile: state.profile.profileLoad.data
});

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    doSearchProfile: () =>
      dispatch(fetchingAction(SearchActions.searchProfiles))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTemplate(withNavigation(SearchScreen), lang("Find a partner"), false));
