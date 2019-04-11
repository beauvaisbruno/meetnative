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
import { NavigationInjectedProps } from "react-navigation";
import HeaderApp from "./HeaderApp";
import custom from "../config/native-base-theme/variables/custom";

function PageTemplate(
  Screen: any,
  headerTitle: string,
  padding = true,
  noScroll = false
) {
  return class extends React.Component<NavigationInjectedProps> {
    render() {
      return (
        <Container style={{ backgroundColor: custom.backgroundApp }}>
          <HeaderApp headerTitle={headerTitle} />
          {noScroll || (
            <Content padder={padding}>
              <Screen {...this.props} />
            </Content>
          )}
          {noScroll && <Screen {...this.props} />}
        </Container>
      );
    }
  };
}

export default PageTemplate;
