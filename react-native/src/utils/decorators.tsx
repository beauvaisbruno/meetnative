import { applyMiddleware, createStore } from "redux";
import { rootReducers } from "../rootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import React, { FunctionComponent, ReactNode } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { RenderFunction } from "@storybook/react-native";
import { Root } from "native-base";
import { createCache } from "./mocks";
import { MockedProvider } from "react-apollo/test-utils";
import { getLastMessages } from "../components/partners/PartnersList";

export const mockStore = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware())
);

export const mockBase = (children: React.ReactNode) =>
  class MockBase extends React.Component<any> {
    render() {
      return <Root>{children}</Root>;
    }
  };

export const MockBaseAndNavigator: FunctionComponent = ({ children }) => {
  const Container = createAppContainer(
    createSwitchNavigator(
      { screen: mockBase(children) },
      { initialRouteName: "screen" }
    )
  );
  return <Container />;
};

export const storeBaseAndNavigatorDecorator = (story: RenderFunction) => (
  <Provider store={mockStore}>
    <MockBaseAndNavigator>{story()}</MockBaseAndNavigator>
  </Provider>
);

export const baseDecorator = (story: RenderFunction) => <Root>{story()}</Root>;

export const navigatorDecorator = (story: RenderFunction) => (
  <MockBaseAndNavigator>{story()}</MockBaseAndNavigator>
);

export const storeDecorator = (story: RenderFunction) => (
  <Provider store={mockStore}>{story()}</Provider>
);
export const MockedApollo = ({
  children,
  mocks
}: {
  children: JSX.Element;
  mocks: { q: any; v: Object; r?: Object; e?: boolean }[];
}) => {
  const formatedMocks: {
    request: { query: any; variables: Object };
    result: { data?: Object; errors?: Array<Object> };
  }[] = [];
  mocks.forEach(mock => {
    const formatedMock = {
      request: {
        query: mock.q,
        variables: mock.v
      },
      result: {
        data: mock.r,
        errors: mock.e ? [{ message: "Mocked Error" }] : undefined
      }
    };
    formatedMocks.push(formatedMock);
  });
  return (
    <MockedProvider
      {...{
        mocks: formatedMocks,
        cache: createCache()
      }}
    >
      {children}
    </MockedProvider>
  );
};
