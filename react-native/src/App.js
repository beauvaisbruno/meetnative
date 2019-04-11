"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const RootNavigation_1 = __importDefault(require("./components/RootNavigation"));
const native_base_1 = require("native-base");
const react_redux_1 = require("react-redux");
const redux_persist_1 = require("redux-persist");
// @ts-ignore
const react_2 = require("redux-persist/lib/integration/react");
const react_apollo_1 = require("react-apollo");
const intl_1 = require("./config/intl");
const RNLocalize = __importStar(require("react-native-localize")); // eslint-disable-line
const apollo_1 = require("./config/apollo");
const redux_1 = require("./config/redux");
// @ts-ignore
const components_1 = __importDefault(require("./config/native-base-theme/components"));
const custom_1 = __importDefault(require("./config/native-base-theme/variables/custom"));
const Loading_1 = __importDefault(require("./utils/Loading"));
const { languageTag } = RNLocalize.findBestAvailableLanguage([
    "fr",
    "en",
    "es"
]) || { languageTag: "en" };
intl_1.changeLocale(languageTag);
class App extends react_1.Component {
    render() {
        return (react_1.default.createElement(native_base_1.StyleProvider, { style: components_1.default(custom_1.default) },
            react_1.default.createElement(native_base_1.Root, null,
                react_1.default.createElement(react_apollo_1.ApolloProvider, { client: apollo_1.client },
                    react_1.default.createElement(react_redux_1.Provider, { store: redux_1.store },
                        react_1.default.createElement(react_2.PersistGate, { loading: react_1.default.createElement(Loading_1.default, null), persistor: redux_persist_1.persistStore(redux_1.store) },
                            react_1.default.createElement(RootNavigation_1.default, null)))))));
    }
}
exports.default = App;
