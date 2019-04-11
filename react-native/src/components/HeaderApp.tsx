import * as React from "react";
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Title
} from "native-base";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { IApplicationState, IProfile } from "../rootReducers";
import { connect } from "react-redux";
import lang from "./lang";
import { Alert } from "react-native";

type IProps = NavigationInjectedProps & {
  headerTitle: string;
  userProfile: IProfile | null;
};

export class HeaderApp extends React.Component<IProps> {
  render() {
    return (
      <Header>
        <Left>
          <Button
            transparent
            testID={"menuButton"}
            onPress={() => this.openMenu()}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.headerTitle}</Title>
        </Body>
        <Right />
      </Header>
    );
  }

  private openMenu() {
    if (this.props.userProfile === null) {
      Alert.alert(lang("Save your profile info before to start"));
    } else this.props.navigation.openDrawer();
  }
}

export const mapStateToProps = (state: IApplicationState) => ({
  userProfile: state.profile.profileLoad.data!
});

export default connect(mapStateToProps)(withNavigation(HeaderApp));
