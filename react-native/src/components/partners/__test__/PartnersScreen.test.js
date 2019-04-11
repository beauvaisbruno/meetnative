"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const jsdom_1 = __importDefault(require("../../../../jest/jsdom"));
jsdom_1.default();
const PartnersList = jest.fn(props => (React.createElement(react_native_1.View, Object.assign({ testID: "PartnersList" }, props))));
jest.mock("../PartnersList", () => ({
    PartnersList
}));
// PartnersListRoot.PartnersList = PartnerList;
const enzyme_1 = require("enzyme");
const test_utils_1 = require("react-apollo/test-utils");
const waait_1 = __importDefault(require("waait"));
const React = __importStar(require("react"));
const PartnersScreen_1 = require("../PartnersScreen");
const testUtils_1 = require("../../../../jest/testUtils");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const partnersTypes_1 = require("../partnersTypes");
const mocks_1 = require("../../../utils/mocks");
const decorators_1 = require("../../../utils/decorators");
const getUserProfile2 = graphql_tag_1.default `
  query getUserProfile {
    getUserProfile {
      ...profileFields
    }
  }
  ${partnersTypes_1.profileFields}
`;
const userProfile = mocks_1.mockProfile();
testUtils_1.mockDate();
describe("PartnerScreen", () => {
    it("success", () => __awaiter(this, void 0, void 0, function* () {
        const cache = mocks_1.createCache();
        cache.writeQuery({
            // TODO Wait for next react-apollo package version that allow @client directive to me be used inside mock
            query: getUserProfile2,
            data: {
                getUserProfile: userProfile
            }
        });
        const tree = enzyme_1.mount(React.createElement(test_utils_1.MockedProvider, { mocks: [], cache: cache },
            React.createElement(decorators_1.MockBaseAndNavigator, null, 
            // @ts-ignore
            React.createElement(PartnersScreen_1.PartnersScreen, null))));
        yield waait_1.default(1);
        tree.update();
        testUtils_1.expectTestIDPropExists(tree, "PartnersList");
        expect(PartnersList.mock.calls[0][0].userProfile.id).toEqual(userProfile.id);
    }));
});
