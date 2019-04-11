"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const native_base_1 = require("native-base");
const lang_1 = __importDefault(require("./lang"));
const React = __importStar(require("react"));
const custom_1 = __importDefault(
  require("../../config/native-base-theme/variables/custom")
);
const createRows = () => {
  const rows = [];
  for (let i = 18; i < 77; i++) {
    rows.push(
      //@ts-ignore
      React.createElement(native_base_1.Picker.Item, {
        label: lang_1.default("{age} yo", { age: i }),
        value: i,
        key: i
      })
    );
  }
  return rows;
};
exports.AgeSelector = ({ value, onChange }) => {
  return React.createElement(
    native_base_1.Picker,
    {
      testID: "picker",
      mode: "dropdown",
      iosIcon: React.createElement(native_base_1.Icon, { name: "arrow-down" }),
      placeholder: lang_1.default("Select your age"),
      placeholderStyle: { color: custom_1.default.textGrey },
      placeholderIconColor: custom_1.default.textGrey,
      style: { width: undefined },
      selectedValue: value,
      onValueChange: age => {
        onChange(age);
      }
    },
    createRows()
  );
};
