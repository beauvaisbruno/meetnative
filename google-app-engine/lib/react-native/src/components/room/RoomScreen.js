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
const lang_1 = __importDefault(require("./lang"));
const reducerHelper_1 = require("../../utils/reducerHelper");
const react_redux_1 = require("react-redux");
const roomReducer_1 = require("./roomReducer");
const utilsUi_1 = require("../../utils/utilsUi");
const ChatHeader_1 = __importDefault(require("./ChatHeader"));
const react_navigation_1 = require("react-navigation");
const MessagesUi_1 = __importDefault(require("./MessagesUi"));
const react_native_firebase_1 = __importDefault(
  require("react-native-firebase")
);
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
class RoomScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({ message: "" }, props.storyState, {
      contactProfile: this.props.navigation.getParam("contactProfile", null)
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();
  }
  componentDidMount() {
    this.userId = react_native_firebase_1.default.auth().currentUser.uid;
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.setState(
          Object.assign({}, this.state, {
            contactProfile: this.props.navigation.getParam(
              "contactProfile",
              null
            )
          })
        );
        this.props.doSyncMessages();
      }
    );
    this.blurListener = this.props.navigation.addListener(
      "willBlur",
      payload => {
        this.props.doStopSyncMessages();
      }
    );
  }
  render() {
    return React.createElement(
      native_base_1.View,
      { style: { flex: 1 } },
      React.createElement(ChatHeader_1.default, {
        profile: this.state.contactProfile,
        user: this.props.userProfile
      }),
      React.createElement(MessagesUi_1.default, {
        contactProfile: this.state.contactProfile
      }),
      React.createElement(
        native_base_1.View,
        {
          style: Object.assign(
            { flexDirection: "row" },
            utilsUi_1.border(custom_1.default.borderColor),
            utilsUi_1.margin(5),
            utilsUi_1.padding(5),
            { marginTop: 0, borderRadius: 10 }
          )
        },
        React.createElement(native_base_1.Input, {
          style: Object.assign({}, utilsUi_1.noMarPad, { fontSize: 25 }),
          placeholder: lang_1.default("Message"),
          placeholderTextColor: custom_1.default.textGreyLight,
          onChangeText: text =>
            this.setState(Object.assign({}, this.state, { message: text })),
          value: this.state.message
        }),
        React.createElement(
          native_base_1.Button,
          {
            block: true,
            transparent: true,
            onPress: () => this.sendMessage(),
            testID: "sendBtn",
            style: Object.assign({}, utilsUi_1.noMarPad)
          },
          this.props.sendMessage.fetching ||
            React.createElement(native_base_1.Icon, {
              name: "send",
              type: "FontAwesome",
              style: Object.assign({}, utilsUi_1.noMarPad, {
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 40
              })
            }),
          this.props.sendMessage.fetching &&
            React.createElement(native_base_1.Icon, {
              name: "send-o",
              type: "FontAwesome",
              style: Object.assign({}, utilsUi_1.noMarPad, {
                paddingLeft: 15,
                paddingRight: 15,
                fontSize: 40
              })
            })
        )
      )
    );
  }
  sendMessage() {
    console.log("sendMessage: ", this.state.message);
    if (this.state.message === "") return;
    const msg = this.state.message;
    this.setState(Object.assign({}, this.state, { message: "" }));
    this.props.doSendMessages({
      message: msg,
      time: Date.now(),
      authorId: this.userId,
      recipientId: this.state.contactProfile.id
    });
  }
}
exports.RoomScreen = RoomScreen;
exports.mapDispatchToProps = dispatch => {
  return {
    doSendMessages: message =>
      dispatch(
        reducerHelper_1.fetchingAction(
          roomReducer_1.RoomActions.sendMessages,
          message
        )
      ),
    doSyncMessages: () =>
      dispatch(
        reducerHelper_1.fetchingAction(roomReducer_1.RoomActions.syncMessages)
      ),
    doStopSyncMessages: () =>
      dispatch(
        reducerHelper_1.fetchingAction(
          roomReducer_1.RoomActions.stopSyncMessages
        )
      )
  };
};
exports.mapStateToProps = state => ({
  sendMessage: state.room.sendMessages,
  userProfile: state.profile.profileLoad.data
});
exports.default = react_redux_1.connect(
  exports.mapStateToProps,
  exports.mapDispatchToProps
)(
  react_navigation_1.withNavigation(
    PageTemplate_1.default(RoomScreen, lang_1.default("Chat"), false, true)
  )
);
//# sourceMappingURL=RoomScreen.js.map
