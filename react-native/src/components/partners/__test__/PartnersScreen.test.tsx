import { View } from "react-native";
import jsdom from "../../../../jest/jsdom";
jsdom();
const PartnersList = jest.fn(props => (
  <View testID="PartnersList" {...props} />
));
jest.mock("../PartnersList", () => ({
  PartnersList
}));

// PartnersListRoot.PartnersList = PartnerList;

import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";
import * as React from "react";
import { PartnersScreen, getUserProfile } from "../PartnersScreen";
import {
  expectExists,
  expectTestIDPropExists,
  mockDate
} from "../../../../jest/testUtils";
import gql from "graphql-tag";
import { profileFields } from "../partnersTypes";
import { createCache, mockProfile } from "../../../utils/mocks";
import { MockBaseAndNavigator } from "../../../utils/decorators";

const getUserProfile2 = gql`
  query getUserProfile {
    getUserProfile {
      ...profileFields
    }
  }
  ${profileFields}
`;
const userProfile = mockProfile();
mockDate();
describe("PartnerScreen", () => {
  it("success", async () => {
    const cache = createCache();
    cache.writeQuery({
      // TODO Wait for next react-apollo package version that allow @client directive to me be used inside mock
      query: getUserProfile2,
      data: {
        getUserProfile: userProfile
      }
    });
    const tree = mount(
      <MockedProvider mocks={[]} cache={cache}>
        <MockBaseAndNavigator>
          {
            // @ts-ignore
            <PartnersScreen />
          }
        </MockBaseAndNavigator>
      </MockedProvider>
    );

    await wait(1);
    tree.update();

    expectTestIDPropExists(tree, "PartnersList");
    expect(PartnersList.mock.calls[0][0].userProfile.id).toEqual(
      userProfile.id
    );
  });
});
