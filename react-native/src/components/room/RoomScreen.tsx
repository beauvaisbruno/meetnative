import * as React from "react";
import {
  Button,
  Content,
  Icon,
  Input,
  Item,
  Label,
  Text,
  View
} from "native-base";
import PageTemplate from "../PageTemplate";
import lang from "./lang";
import { IApplicationState, IProfile } from "../../rootReducers";
import { Dispatch } from "redux";
import {
  ActionResult,
  fetchingAction,
  IActionResult
} from "../../utils/reducerHelper";
import { connect } from "react-redux";
import { IMessage, RoomActions } from "./roomReducer";
import { border, font, margin, noMarPad, padding } from "../../utils/utilsUi";
import ChatHeader from "./ChatHeader";
import {
  NavigationEventSubscription,
  NavigationInjectedProps,
  withNavigation
} from "react-navigation";
import MessagesUi from "./MessagesUi";
import firebase from "react-native-firebase";
import custom from "../../config/native-base-theme/variables/custom";

export type IProps = NavigationInjectedProps & {
  doSendMessages: (message: IMessage) => void;
  doSyncMessages: () => void;
  userProfile: IProfile;
  sendMessage: IActionResult<undefined>;
  doStopSyncMessages: () => void;
};
export interface IState {
  message: string;
  contactProfile: IProfile;
}
export class RoomScreen extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      message: "",
      ...props.storyState,
      contactProfile: this.props.navigation.getParam("contactProfile", null)
    };
  }
  focusListener: NavigationEventSubscription | undefined;
  blurListener: NavigationEventSubscription | undefined;
  public componentWillUnmount() {
    if (this.focusListener) this.focusListener.remove();
    if (this.blurListener) this.blurListener.remove();
  }
  public componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.setState({
          ...this.state,
          contactProfile: this.props.navigation.getParam("contactProfile", null)
        });
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
    return (
      <View style={{ flex: 1 }}>
        <ChatHeader
          profile={this.state.contactProfile!}
          user={this.props.userProfile}
        />

        <MessagesUi contactProfile={this.state.contactProfile!} />

        <View
          style={{
            flexDirection: "row",
            ...border(custom.borderColor),
            ...margin(5),
            ...padding(5),
            marginTop: 0,
            borderRadius: 10
          }}
        >
          <Input
            style={{ ...noMarPad, fontSize: 25 }}
            placeholder={lang("Message")}
            placeholderTextColor={custom.textGreyLight}
            onChangeText={(text: string) =>
              this.setState({ ...this.state, message: text })
            }
            value={this.state.message}
          />
          <Button
            block
            transparent
            onPress={() => this.sendMessage()}
            testID={"sendBtn"}
            style={{ ...noMarPad }}
          >
            {this.props.sendMessage.fetching || (
              <Icon
                name="send"
                type="FontAwesome"
                style={{
                  ...noMarPad,
                  paddingLeft: 15,
                  paddingRight: 15,
                  fontSize: 40
                }}
              />
            )}
            {this.props.sendMessage.fetching && (
              <Icon
                name="send-o"
                type="FontAwesome"
                style={{
                  ...noMarPad,
                  paddingLeft: 15,
                  paddingRight: 15,
                  fontSize: 40
                }}
              />
            )}
          </Button>
        </View>
      </View>
    );
  }

  private sendMessage() {
    if (this.state.message === "") return;
    const msg = this.state.message;
    this.setState({ ...this.state, message: "" });
    this.props.doSendMessages({
      message: msg,
      time: Date.now(),
      authorId: this.props.userProfile.id!,
      recipientId: this.state.contactProfile.id!
    });
  }
}
export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    doSendMessages: (message: IMessage) =>
      dispatch(fetchingAction(RoomActions.sendMessages, message)),

    doSyncMessages: () => dispatch(fetchingAction(RoomActions.syncMessages)),
    doStopSyncMessages: () =>
      dispatch(fetchingAction(RoomActions.stopSyncMessages))
  };
};

export const mapStateToProps = (state: IApplicationState) => ({
  sendMessage: state.room.sendMessages,
  userProfile: state.profile.profileLoad.data
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(PageTemplate(RoomScreen, lang("Chat"), false, true)));
