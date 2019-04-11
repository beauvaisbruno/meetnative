import * as React from "react";
import { Container, Content, List, ListItem, Text } from "native-base";
import { objsToArrayWithKey } from "../../utils/utils";
import LogoutButton from "../profile/LogoutButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AutoHeightImage from "react-native-auto-height-image";
import { StyleProp, TextStyle } from "react-native";
import custom from "../../config/native-base-theme/variables/custom";
import {
  NavigationInjectedProps,
  NavigationScreenProp
} from "react-navigation";

export const renderRows = (
  data: { key: string; menuLabel: string },
  navigation: NavigationScreenProp<any, any>
) => {
  return (
    <ListItem
      onPress={() => {
        navigation.navigate(data.key);
        navigation.closeDrawer();
      }}
      button
      testID={data.key}
    >
      <Text
        style={{
          color:
            navigation.state.routeName === data.key
              ? custom.textGreyLight
              : custom.textGrey
        }}
      >
        {data.menuLabel}
      </Text>
    </ListItem>
  );
};

const SideBar = (
  props: { routes: { [x: string]: any } } & NavigationInjectedProps
) => (
  <Container>
    <Content>
      <AutoHeightImage
        source={require("../login/img/header.png")}
        width={wp("80%")}
      />
      <List
        dataArray={objsToArrayWithKey(props.routes)}
        renderRow={data => renderRows(data, props.navigation)}
      />
      <LogoutButton />
    </Content>
  </Container>
);
export default SideBar;
