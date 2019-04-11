import { shallow } from "enzyme";
import * as React from "react";
import { GooglePlacesInput } from "../GooglePlacesInput";
import toJson from "enzyme-to-json";

it("GooglePlacesInput", async () => {
  const onChange = jest.fn();
  const tree = shallow(
    <GooglePlacesInput onChange={onChange} city={"value"} />
  );
  expect(toJson(tree)).toMatchSnapshot();
  const GooglePlacesAutocomplete = tree.findWhere(
    node => node.prop("testID") === "GooglePlacesAutocomplete"
  );
  GooglePlacesAutocomplete.props().onPress(
    {},
    { name: "name", geometry: { location: { lat: 1, lng: 2 } } }
  );
  expect(onChange).toBeCalledWith("name", 1, 2);
});
