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
const React = __importStar(require("react"));
const enzyme_1 = require("enzyme");
const enzyme_to_json_1 = __importDefault(require("enzyme-to-json"));
const SideBar_1 = __importStar(require("../SideBar"));
it("sidebar", () => {
    const navigate = jest.fn();
    const navigation = {
        closeDrawer: jest.fn(),
        navigate,
        state: { routeName: "routeName" }
    };
    const routes = {
        one: { menuLabel: "menuLabelOne" },
        two: { menuLabel: "menuLabelTwo" }
    };
    // @ts-ignore
    const tree = enzyme_1.shallow(React.createElement(SideBar_1.default, { routes: routes, navigation: navigation }));
    expect(enzyme_to_json_1.default(tree)).toMatchSnapshot();
    const dataArray = tree
        .find("Styled(List)")
        .prop("dataArray");
    dataArray.forEach(data => {
        // @ts-ignore
        const listItems = enzyme_1.shallow(SideBar_1.renderRows(data, navigation));
        expect(enzyme_to_json_1.default(listItems)).toMatchSnapshot();
        const submitBtn = listItems.findWhere(node => node.prop("testID") === data.key);
        submitBtn.props().onPress();
        expect(navigate).toBeCalledWith(data.key);
    });
});
