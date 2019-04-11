"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var lang_1 = require("./lang");
var React = require("react");
var custom_1 = require("../../config/native-base-theme/variables/custom");
var createRows = function () {
    var rows = [];
    for (var i = 18; i < 77; i++) {
        rows.push(
        //@ts-ignore
        <native_base_1.Picker.Item label={lang_1.default("{age} yo", { age: i })} value={i} key={i}/>);
    }
    return rows;
};
exports.AgeSelector = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (<native_base_1.Picker testID={"picker"} mode="dropdown" iosIcon={<native_base_1.Icon name="arrow-down"/>} placeholder={lang_1.default("Select your age")} placeholderStyle={{ color: custom_1.default.textGrey }} placeholderIconColor={custom_1.default.textGrey} style={{ width: undefined }} selectedValue={value} onValueChange={function (age) {
        onChange(age);
    }}>
      {createRows()}
    </native_base_1.Picker>);
};
