import { View, Text } from "native-base";
import * as React from "react";
import { TouchableHighlight } from "react-native";
import { avatars } from "./img/Avatars";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AutoHeightImage from "react-native-auto-height-image";
import {
  NavigationEventSubscription,
  NavigationInjectedProps,
  withNavigation
} from "react-navigation";

export class AvatarSelector extends React.Component<
  {
    value: string;
    onChange: (avatar: string) => void;
  } & NavigationInjectedProps
> {
  navListener: NavigationEventSubscription | undefined;
  public componentWillUnmount() {
    if (this.navListener) this.navListener.remove();
  }
  public componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        if (
          this.props.navigation.state.params &&
          this.props.navigation.state.params.avatar
        ) {
          this.props.onChange(this.props.navigation.state.params.avatar);
          this.props.navigation.state.params.avatar = undefined;
        }
      }
    );
  }

  public render() {
    return (
      <View
        style={{
          textAlignVertical: "top",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{ textAlignVertical: "top", flex: 1, flexDirection: "row" }}
        >
          <Text style={{ textAlignVertical: "top", marginRight: 10 }}>
            Avatar
          </Text>
          <TouchableHighlight
            testID={"TouchableHighlight"}
            onPress={() => {
              this.props.navigation.navigate("AvatarScreen");
            }}
          >
            <AutoHeightImage
              source={avatars[this.props.value] as number}
              width={wp("45%")}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default withNavigation(AvatarSelector);
