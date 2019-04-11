"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var lang_1 = require("./lang");
var React = require("react");
var custom_1 = require("../../config/native-base-theme/variables/custom");
exports.GenderSelector = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (<native_base_1.Picker testID={"picker"} mode="dropdown" iosIcon={<native_base_1.Icon name="arrow-down"/>} placeholder={lang_1.default("Select your gender")} placeholderStyle={{ color: custom_1.default.textGrey }} placeholderIconColor={custom_1.default.textGrey} style={{ width: undefined }} selectedValue={value} onValueChange={function (isMale) {
        onChange(isMale);
    }}>
      <native_base_1.Picker.Item label={lang_1.default("Male")} value={true} key={"Male"}/>
      <native_base_1.Picker.Item label={lang_1.default("Female")} value={false} key={"Female"}/>
    </native_base_1.Picker>);
};
