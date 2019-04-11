import React, { Component } from "react";
import { Container, Content, Text, View } from "native-base";
import FbLoginButton from "./FbLoginButton";
import EmailLoginUi from "./EmailLoginUi";
import GoogleLoginButton from "./GoogleLoginButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AutoHeightImage from "react-native-auto-height-image";

class LoginScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <AutoHeightImage
            source={require("./img/header.png")}
            width={wp("100%")}
          />
          <View padder>
            <GoogleLoginButton />
            <FbLoginButton />
            <EmailLoginUi />
          </View>
        </Content>
      </Container>
    );
  }
}

export default LoginScreen;
