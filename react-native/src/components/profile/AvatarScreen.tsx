import { NavigationInjectedProps, withNavigation } from "react-navigation";
import * as React from "react";
import { Content, View } from "native-base";
import { avatars } from "./img/Avatars";
import { TouchableHighlight } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const AvatarScreen = ({ navigation }: NavigationInjectedProps) => {
  const rows: JSX.Element[] = [];
  let even = true;
  let cols: JSX.Element[] = [];
  Object.keys(avatars).forEach(index => {
    cols.push(
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("ProfileContainer", { avatar: index });
        }}
        key={index}
        testID={index}
      >
        <AutoHeightImage source={avatars[index] as number} width={wp("50%")} />
      </TouchableHighlight>
    );
    if (!even) {
      rows.push(
        <View key={index} style={{ flexDirection: "row" }}>
          {cols}
        </View>
      );
      cols = [];
    }
    even = !even;
  });

  return <Content>{rows}</Content>;
};

export default withNavigation(AvatarScreen);
