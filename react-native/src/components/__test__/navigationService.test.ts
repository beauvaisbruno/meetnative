const navigate = jest.fn();
jest.mock("react-navigation", () => ({ NavigationActions: { navigate } }));
import navigationService from "../navigationService";

it("NavigationService", () => {
  const dispatch = jest.fn(() => {});
  navigate.mockReturnValue("NavigationActions");
  // @ts-ignore
  navigationService.setTopLevelNavigator({ dispatch });
  // @ts-ignore
  navigationService.navigate("params");
  expect(dispatch).toBeCalledWith("NavigationActions");
  expect(navigate).toBeCalledWith("params");
});
