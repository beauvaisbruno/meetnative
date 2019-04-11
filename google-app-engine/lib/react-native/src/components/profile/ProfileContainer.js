"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const PageTemplate_1 = __importDefault(require("../PageTemplate"));
const react_redux_1 = require("react-redux");
const reducerHelper_1 = require("../../utils/reducerHelper");
const profileReducer_1 = require("./profileReducer");
const ProfileScreen_1 = __importDefault(require("./ProfileScreen"));
const lang_1 = __importDefault(require("../lang"));
const react_navigation_1 = require("react-navigation");
exports.mapStateToProps = state => state.profile;
exports.mapDispatchToProps = dispatch => {
  return {
    updateProfile: (values, actions) =>
      dispatch(
        reducerHelper_1.fetchingAction(
          profileReducer_1.ProfileActions.profileUpdate,
          values,
          actions
        )
      ),
    loadProfile: () =>
      dispatch(
        reducerHelper_1.fetchingAction(
          profileReducer_1.ProfileActions.profileLoad
        )
      )
  };
};
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(
  react_navigation_1.withNavigation(
    PageTemplate_1.default(ProfileScreen_1.default, lang_1.default("Profile"))
  )
);
//# sourceMappingURL=ProfileContainer.js.map
