import * as React from "react";
import { Spinner, View, Text } from "native-base";
import { mount } from "enzyme";

class Loading extends React.Component<{}, { displayMessage: boolean }> {
  timer: NodeJS.Timeout;
  private begin: number;

  constructor(props: any) {
    super(props);
    this.enableMessage = this.enableMessage.bind(this);
    this.state = {
      displayMessage: false
    };
    this.timer = setTimeout(this.enableMessage, 250);
    this.begin = Date.now();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage() {
    this.setState({ displayMessage: true });
  }

  render() {
    const { displayMessage } = this.state;

    if (!displayMessage) {
      return null;
    }
    return <Spinner />;
  }
}

export default Loading;
