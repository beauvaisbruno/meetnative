const createAppContainer = jest.fn();
const createStackNavigator = jest.fn();
jest.mock("react-navigation", () => {
  return {
    createAppContainer,
    createStackNavigator
  };
});
createStackNavigator.mockReturnValue("LoginNavigation");
jest.mock("../LoginScreen", () => {});
jest.mock("../ResetPasswordScreen", () => {});
import LoginNavigation from "../LoginNavigation";
import LoginScreen from "../LoginScreen";
import ResetPasswordScreen from "../ResetPasswordScreen";

it("login Navigation", () => {
  const test = LoginNavigation;
  expect(createAppContainer).toBeCalledWith("LoginNavigation");
  expect(createStackNavigator).toBeCalledWith(
    {
      LoginScreen,
      ResetPasswordScreen
    },
    {
      headerMode: "none",
      initialRouteName: "LoginScreen"
    }
  );
});
