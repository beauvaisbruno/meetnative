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
const utilsUi_1 = require("../../utils/utilsUi");
const react_redux_1 = require("react-redux");
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const react_navigation_1 = require("react-navigation");
const utils_1 = require("../../utils/utils");
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
const Loading_1 = __importDefault(require("../../utils/Loading"));
class MessagesUi extends React.Component {
  constructor() {
    super(...arguments);
    this.prevRecipientMsg = null;
  }
  render() {
    const { loadRoom, loadAuthor, loadRecipient, userProfile } = this.props;
    const hasLoad = !loadRoom.fetching && loadAuthor.data && loadRecipient.data;
    if (!hasLoad)
      return React.createElement(
        native_base_1.Content,
        null,
        React.createElement(Loading_1.default, null)
      );
    const messages = utils_1.sortByTimeAsc(
      loadAuthor.data.concat(loadRecipient.data)
    );
    const rows = [];
    const recipientStyle = {
      backgroundColor: custom_1.default.brandSecondaryLight,
      alignSelf: "flex-start"
    };
    const authorStyle = {
      backgroundColor: custom_1.default.brandPrimaryLight,
      alignSelf: "flex-end"
    };
    let lastIsAuthor = null;
    let lastTime = null;
    const contactId = this.props.contactProfile.id;
    messages.forEach(message => {
      try {
        if (contactId !== message.authorId && contactId !== message.recipientId)
          return;
        const isAuthor = message.authorId === userProfile.id;
        if (lastIsAuthor !== null && lastIsAuthor !== isAuthor)
          rows.push(
            React.createElement(native_base_1.View, {
              style: { paddingTop: 10 },
              key: message.time + "-padder"
            })
          );
        if (lastTime === null || message.time - lastTime > 5 * 60 * 1000)
          rows.push(
            React.createElement(
              native_base_1.Text,
              {
                style: {
                  textAlign: "center",
                  color: custom_1.default.textGreyLight
                },
                key: message.time + "-time"
              },
              utilsUi_1.formatDuration(message.time)
            )
          );
        const rowStyle = isAuthor ? authorStyle : recipientStyle;
        rows.push(
          React.createElement(
            native_base_1.Text,
            {
              style: Object.assign(
                {
                  borderRadius: 10,
                  fontSize: utilsUi_1.font(25),
                  color: custom_1.default.textGrey
                },
                utilsUi_1.margin(2),
                utilsUi_1.padding(5),
                rowStyle,
                {
                  minWidth: react_native_responsive_screen_1.widthPercentageToDP(
                    "25%"
                  ),
                  maxWidth: react_native_responsive_screen_1.widthPercentageToDP(
                    "85%"
                  )
                }
              ),
              key: message.time
            },
            message.message
          )
        );
        lastIsAuthor = isAuthor;
        lastTime = message.time;
      } catch (error) {
        console.log("error: ", error);
      }
    });
    return React.createElement(
      native_base_1.Content,
      { ref: ref => (this.scrollView = ref) },
      React.createElement(native_base_1.View, { style: { flex: 1 } }, rows)
    );
  }
  componentDidUpdate() {
    if (this.scrollView) this.scrollView._root.scrollToEnd();
  }
}
exports.MessagesUi = MessagesUi;
exports.mapStateToProps = state =>
  Object.assign({}, state.room, {
    userProfile: state.profile.profileLoad.data
  });
exports.default = react_redux_1.connect(exports.mapStateToProps)(
  react_navigation_1.withNavigation(MessagesUi)
);
//# sourceMappingURL=MessagesUi.js.map
