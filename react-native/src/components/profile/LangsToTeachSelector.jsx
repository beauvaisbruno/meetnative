"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var React = require("react");
var lang_1 = require("./lang");
var Language_1 = require("../../Language");
var react_native_responsive_screen_1 = require("react-native-responsive-screen");
var TeachLevel_1 = require("../../TeachLevel");
var utilsUi_1 = require("../../utils/utilsUi");
function addRow(languagesToTeach) {
    for (var _i = 0, _a = Language_1.default.all; _i < _a.length; _i++) {
        var language = _a[_i];
        if (languagesToTeach[language] === undefined) {
            var notUsedLangObj = {};
            notUsedLangObj[language] = TeachLevel_1.TeachLevel.fluent;
            return notUsedLangObj;
        }
    }
    return {};
}
var createLevels = function () {
    var rows = [];
    TeachLevel_1.TeachLevel.all.forEach(function (level) {
        rows.push(<native_base_1.Picker.Item label={TeachLevel_1.TeachLevel.lang(level)} value={level} key={level}/>);
    });
    return rows;
};
exports.LangsToTeachSelector = function (_a) {
    var languagesToTeach = _a.languagesToTeach, onChange = _a.onChange;
    var rows = [];
    var firstRow = true;
    Object.keys(languagesToTeach).forEach(function (language) {
        rows.push(<native_base_1.View key={language} style={{ flexDirection: "row" }}>
        <native_base_1.View key={language} style={{ width: react_native_responsive_screen_1.widthPercentageToDP("35%") }}>
          <native_base_1.Picker testID={"lang-" + language} mode="dropdown" iosIcon={<native_base_1.Icon name="arrow-down"/>} selectedValue={language} onValueChange={function (newLanguage) {
            var newLanguagesToTeach = __assign({}, languagesToTeach);
            newLanguagesToTeach[newLanguage] = languagesToTeach[language];
            delete newLanguagesToTeach[language];
            onChange(newLanguagesToTeach);
        }}>
            {utilsUi_1.createLangPickers()}
          </native_base_1.Picker>
        </native_base_1.View>
        <native_base_1.View key={languagesToTeach[language]} style={{ width: react_native_responsive_screen_1.widthPercentageToDP("50%") }}>
          <native_base_1.Picker testID={"level-" + language} mode="dropdown" iosIcon={<native_base_1.Icon name="arrow-down"/>} selectedValue={languagesToTeach[language]} onValueChange={function (newLevel) {
            var newLanguagesToTeach = __assign({}, languagesToTeach);
            newLanguagesToTeach[language] = newLevel;
            onChange(newLanguagesToTeach);
        }}>
            {createLevels()}
          </native_base_1.Picker>
        </native_base_1.View>
        {Object.keys(languagesToTeach).length > 1 && (<native_base_1.Button testID={"delete-" + language} transparent primary onPress={function () {
            var newLanguagesToTeach = __assign({}, languagesToTeach);
            delete newLanguagesToTeach[language];
            onChange(newLanguagesToTeach);
        }}>
            <native_base_1.Icon style={{
            paddingRight: 0,
            marginRight: 0,
            paddingLeft: 0,
            marginLeft: 0
        }} name="delete-forever" type="MaterialIcons" fontSize={30}/>
          </native_base_1.Button>)}
      </native_base_1.View>);
        firstRow = false;
    });
    return (<native_base_1.View>
      <native_base_1.View padder>
        <native_base_1.Text style={{ textDecorationLine: "underline" }}>
          {lang_1.default("Langage to teach")}
        </native_base_1.Text>
      </native_base_1.View>
      {rows}
      {Object.keys(languagesToTeach).length <= 2 && (<native_base_1.Button testID={"addBtn"} transparent primary onPress={function () {
        onChange(__assign({}, languagesToTeach, addRow(languagesToTeach)));
    }}>
          <native_base_1.Icon name="plus-circle" type="FontAwesome" fontSize={30}/>
          <native_base_1.Text>{lang_1.default("Add a langage")}</native_base_1.Text>
        </native_base_1.Button>)}
    </native_base_1.View>);
};
exports.default = exports.LangsToTeachSelector;
