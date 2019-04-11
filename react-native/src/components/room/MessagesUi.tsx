import * as React from "react";
import { Content, Spinner, Text, View } from "native-base";
import { IApplicationState, IProfile } from "../../rootReducers";
import { IMessage, IRoomState, RoomActions } from "./roomReducer";
import { font, formatDuration, margin, padding } from "../../utils/utilsUi";
import { connect } from "react-redux";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { sortByTimeAsc } from "../../utils/utils";
import custom from "../../config/native-base-theme/variables/custom";
import Loading from "../../utils/Loading";

export type IProps = IRoomState &
  NavigationInjectedProps & {
    userProfile: IProfile | undefined;
    contactProfile: IProfile;
  };

export class MessagesUi extends React.Component<IProps> {
  private scrollView: any;
  private prevRecipientMsg: IMessage[] | null = null;

  render() {
    const { loadRoom, loadAuthor, loadRecipient, userProfile } = this.props;
    const hasLoad = !loadRoom.fetching && loadAuthor.data && loadRecipient.data;
    if (!hasLoad)
      return (
        <Content>
          <Loading />
        </Content>
      );
    const messages = sortByTimeAsc(
      loadAuthor.data!.concat(loadRecipient.data!)
    ) as IMessage[];

    const rows: JSX.Element[] = [];
    const recipientStyle: StyleProp<ViewStyle> = {
      backgroundColor: custom.brandSecondaryLight,
      alignSelf: "flex-start"
    };
    const authorStyle: StyleProp<ViewStyle> = {
      backgroundColor: custom.brandPrimaryLight,
      alignSelf: "flex-end"
    };
    let lastIsAuthor: boolean | null = null;
    let lastTime: number | null = null;
    const contactId = this.props.contactProfile.id;
    messages.forEach((message: IMessage) => {
      try {
        if (contactId !== message.authorId && contactId !== message.recipientId)
          return;
        const isAuthor = message.authorId === userProfile!.id;

        if (lastIsAuthor !== null && lastIsAuthor !== isAuthor)
          rows.push(
            <View style={{ paddingTop: 10 }} key={message.time + "-padder"} />
          );
        if (lastTime === null || message.time - lastTime > 5 * 60 * 1000)
          rows.push(
            <Text
              style={{ textAlign: "center", color: custom.textGreyLight }}
              key={message.time + "-time"}
            >
              {formatDuration(message.time)}
            </Text>
          );

        const rowStyle = isAuthor ? authorStyle : recipientStyle;
        rows.push(
          <Text
            style={{
              borderRadius: 10,
              fontSize: font(25),
              color: custom.textGrey,
              ...margin(2),
              ...padding(5),
              ...rowStyle,
              minWidth: wp("25%"),
              maxWidth: wp("85%")
            }}
            key={message.time}
          >
            {message.message}
          </Text>
        );
        lastIsAuthor = isAuthor;
        lastTime = message.time;
      } catch (error) {
        console.log("error: ", error);
      }
    });
    return (
      <Content ref={ref => (this.scrollView = ref)}>
        <View style={{ flex: 1 }}>{rows}</View>
      </Content>
    );
  }
  public componentDidUpdate() {
    if (this.scrollView) this.scrollView!._root.scrollToEnd();
  }
}

export const mapStateToProps = (state: IApplicationState) => ({
  ...state.room,
  userProfile: state.profile.profileLoad.data!
});

export default connect(mapStateToProps)(withNavigation(MessagesUi));
