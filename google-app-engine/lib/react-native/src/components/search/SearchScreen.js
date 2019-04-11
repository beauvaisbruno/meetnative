"use strict";
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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const native_base_1 = require("native-base");
const PageTemplate_1 = __importDefault(require("../PageTemplate"));
const react_redux_1 = require("react-redux");
const lang_1 = __importDefault(require("./lang"));
const reducerHelper_1 = require("../../utils/reducerHelper");
const searchReducer_1 = require("./searchReducer");
const react_navigation_1 = require("react-navigation");
const Avatars_1 = require("../profile/img/Avatars");
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const react_native_auto_height_image_1 = __importDefault(
  require("react-native-auto-height-image")
);
const utils_1 = require("../../utils/utils");
const utilsUi_1 = require("../../utils/utilsUi");
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
const Loading_1 = __importDefault(require("../../utils/Loading"));
class SearchScreen extends React.Component {
  componentWillUnmount() {
    this.navListener.remove();
  }
  componentDidMount() {
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
    const rows = [];
    if (data) {
      const s = utilsUi_1.font(10);
      const m = utilsUi_1.font(15);
      const l = utilsUi_1.font(20);
      data.forEach(profile => {
        rows.push(
          React.createElement(
            native_base_1.View,
            { key: profile.id, style: { flexDirection: "row" } },
            React.createElement(
              native_base_1.View,
              {
                key: "avatar",
                style: {
                  position: "relative",
                  width: react_native_responsive_screen_1.widthPercentageToDP(
                    "50%"
                  )
                }
              },
              React.createElement(react_native_auto_height_image_1.default, {
                source: Avatars_1.avatars[profile.avatar],
                width: react_native_responsive_screen_1.widthPercentageToDP(
                  "50%"
                )
              }),
              React.createElement(
                native_base_1.Button,
                {
                  block: true,
                  rounded: true,
                  success: true,
                  onPress: () =>
                    this.props.navigation.navigate("RoomScreen", {
                      contactProfile: profile
                    }),
                  testID: "contact-" + profile.id,
                  style: {
                    backgroundColor: "rgba(255, 153, 0, 0.7)",
                    position: "absolute",
                    bottom: 10,
                    alignSelf: "center"
                  }
                },
                React.createElement(
                  native_base_1.Text,
                  null,
                  lang_1.default("Contact")
                )
              )
            ),
            React.createElement(
              native_base_1.View,
              {
                key: "description",
                style: {
                  width: react_native_responsive_screen_1.widthPercentageToDP(
                    "50%"
                  ),
                  paddingLeft: 5
                }
              },
              React.createElement(
                native_base_1.View,
                { style: { flexDirection: "row" } },
                React.createElement(
                  native_base_1.Text,
                  { style: { fontWeight: "bold", fontSize: l } },
                  profile.pseudo
                ),
                React.createElement(native_base_1.Icon, {
                  name: profile.isMale ? "gender-male" : "gender-female",
                  type: "MaterialCommunityIcons",
                  style: {
                    color: profile.isMale
                      ? custom_1.default.brandPrimary
                      : custom_1.default.brandSecondary
                  },
                  fontSize: l
                })
              ),
              React.createElement(
                native_base_1.Text,
                {
                  style: { color: custom_1.default.brandPrimary, fontSize: m }
                },
                profile.city,
                " ",
                utils_1.distanceKm(userLat, userLon, profile.lat, profile.lon),
                "km"
              ),
              React.createElement(
                native_base_1.Text,
                {
                  style: { color: custom_1.default.textGreyLight, fontSize: s }
                },
                profile.profession,
                " - ",
                profile.age + lang_1.default("yo")
              ),
              React.createElement(
                native_base_1.Text,
                { style: { fontWeight: "bold", fontSize: s } },
                lang_1.default("Speak")
              ),
              utilsUi_1.teachRows(profile, s, userLearn),
              React.createElement(
                native_base_1.Text,
                { style: { fontWeight: "bold", fontSize: s } },
                lang_1.default("Learn")
              ),
              utilsUi_1.learnRows(profile, s, userTeach)
            )
          )
        );
      });
    }
    return React.createElement(
      native_base_1.View,
      null,
      fetching && React.createElement(Loading_1.default, null),
      error &&
        React.createElement(
          native_base_1.Text,
          { style: { color: custom_1.default.brandDanger } },
          lang_1.default("Impossible to load profiles")
        ),
      rows.length > 0 && (fetching || rows),
      rows.length === 0 &&
        (fetching ||
          React.createElement(
            native_base_1.View,
            null,
            React.createElement(
              native_base_1.Text,
              { style: { fontStyle: "italic", textAlign: "center" } },
              lang_1.default("No user match your profile")
            )
          ))
    );
  }
}
exports.SearchScreen = SearchScreen;
exports.mapStateToProps = state =>
  Object.assign({}, state.search, {
    userProfile: state.profile.profileLoad.data
  });
exports.mapDispatchToProps = dispatch => {
  return {
    doSearchProfile: () =>
      dispatch(
        reducerHelper_1.fetchingAction(
          searchReducer_1.SearchActions.searchProfiles
        )
      )
  };
};
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(
  PageTemplate_1.default(
    react_navigation_1.withNavigation(SearchScreen),
    lang_1.default("Find a partner"),
    false
  )
);
//# sourceMappingURL=SearchScreen.js.map
