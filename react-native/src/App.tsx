import React, { Component } from "react";
import RootNavigation from "./components/RootNavigation";
import { Root, Spinner, StyleProvider } from "native-base";
import { Provider } from "react-redux";
import NavigationService from "./components/navigationService";
import { persistStore } from "redux-persist";
// @ts-ignore
import { PersistGate } from "redux-persist/lib/integration/react";
import { ApolloProvider } from "react-apollo";
import { changeLocale } from "./config/intl";
import * as RNLocalize from "react-native-localize"; // eslint-disable-line
import { client } from "./config/apollo";
import { store } from "./config/redux";
import { initMessaging, stopMessaging } from "./components/firebaseSagas";
// @ts-ignore
import getTheme from "./config/native-base-theme/components";
import custom from "./config/native-base-theme/variables/custom";
import Loading from "./utils/Loading";
const { languageTag } = RNLocalize.findBestAvailableLanguage([
  "fr",
  "en",
  "es"
]) || { languageTag: "en" };
changeLocale(languageTag);
class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
        <Root>
          <ApolloProvider client={client}>
            <Provider store={store}>
              <PersistGate
                loading={<Loading />}
                persistor={persistStore(store)}
              >
                <RootNavigation />
              </PersistGate>
            </Provider>
          </ApolloProvider>
        </Root>
      </StyleProvider>
    );
  }
}

export default App;
