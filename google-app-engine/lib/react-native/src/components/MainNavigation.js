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
const SideBar_1 = __importDefault(require("./sideBar/SideBar"));
const react_navigation_1 = require("react-navigation");
const PartnersScreen_1 = __importDefault(require("./partners/PartnersScreen"));
const ProfileContainer_1 = __importDefault(
  require("./profile/ProfileContainer")
);
const AvatarScreen_1 = __importDefault(require("./profile/AvatarScreen"));
const SearchScreen_1 = __importDefault(require("./search/SearchScreen"));
const RoomScreen_1 = __importDefault(require("./room/RoomScreen"));
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const withDrawer = {
  SearchScreen: { screen: SearchScreen_1.default, menuLabel: "Find a partner" },
  PartnersScreen: {
    screen: PartnersScreen_1.default,
    menuLabel: "Last messages"
  },
  ProfileContainer: {
    screen: ProfileContainer_1.default,
    menuLabel: "Your Profile"
  }
};
const noDrawer = {
  AvatarScreen: { screen: AvatarScreen_1.default },
  RoomScreen: { screen: RoomScreen_1.default }
};
exports.default = (
  pRoutes = Object.assign({}, withDrawer, noDrawer),
  drawerConfig = {
    initialRouteName: "ProfileContainer",
    contentComponent: props =>
      React.createElement(
        SideBar_1.default,
        Object.assign({ routes: withDrawer }, props)
      ),
    drawerWidth: react_native_responsive_screen_1.widthPercentageToDP("80%")
  }
) =>
  react_navigation_1.createAppContainer(
    react_navigation_1.createDrawerNavigator(pRoutes, drawerConfig)
  );
//# sourceMappingURL=MainNavigation.js.map
