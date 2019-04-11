"use strict";
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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const native_base_1 = require("native-base");
const React = __importStar(require("react"));
const lang_1 = __importDefault(require("./lang"));
const Language_1 = __importDefault(require("../../Language"));
const LearnLevel_1 = require("../../LearnLevel");
const react_native_responsive_screen_1 = require("react-native-responsive-screen");
const utilsUi_1 = require("../../utils/utilsUi");
function addRow(languagesToLearn) {
  for (const language of Language_1.default.all) {
    if (languagesToLearn[language] === undefined) {
      const notUsedLangObj = {};
      notUsedLangObj[language] = LearnLevel_1.LearnLevel.beginner;
      return notUsedLangObj;
    }
  }
  return {};
}
const createLevels = () => {
  const rows = [];
  LearnLevel_1.LearnLevel.all.forEach(level => {
    rows.push(
      React.createElement(native_base_1.Picker.Item, {
        label: LearnLevel_1.LearnLevel.lang(level),
        value: level,
        key: level
      })
    );
  });
  return rows;
};
exports.LangsToLearnSelector = ({ languagesToLearn, onChange }) => {
  const rows = [];
  let firstRow = true;
  Object.keys(languagesToLearn).forEach(language => {
    rows.push(
      React.createElement(
        native_base_1.View,
        { key: language, style: { flexDirection: "row" } },
        React.createElement(
          native_base_1.View,
          {
            key: language,
            style: {
              width: react_native_responsive_screen_1.widthPercentageToDP("35%")
            }
          },
          React.createElement(
            native_base_1.Picker,
            {
              testID: "lang-" + language,
              mode: "dropdown",
              iosIcon: React.createElement(native_base_1.Icon, {
                name: "arrow-down"
              }),
              selectedValue: language,
              onValueChange: newLanguage => {
                const newLanguagesToLearn = Object.assign({}, languagesToLearn);
                newLanguagesToLearn[newLanguage] = languagesToLearn[language];
                delete newLanguagesToLearn[language];
                onChange(newLanguagesToLearn);
              }
            },
            utilsUi_1.createLangPickers()
          )
        ),
        React.createElement(
          native_base_1.View,
          {
            key: languagesToLearn[language],
            style: {
              width: react_native_responsive_screen_1.widthPercentageToDP("50%")
            }
          },
          React.createElement(
            native_base_1.Picker,
            {
              testID: "level-" + language,
              mode: "dropdown",
              iosIcon: React.createElement(native_base_1.Icon, {
                name: "arrow-down"
              }),
              selectedValue: languagesToLearn[language],
              onValueChange: newLevel => {
                const newLanguagesToLearn = Object.assign({}, languagesToLearn);
                newLanguagesToLearn[language] = newLevel;
                onChange(newLanguagesToLearn);
              }
            },
            createLevels()
          )
        ),
        Object.keys(languagesToLearn).length > 1 &&
          React.createElement(
            native_base_1.Button,
            {
              testID: "delete-" + language,
              transparent: true,
              primary: true,
              onPress: () => {
                const newLanguagesToLearn = Object.assign({}, languagesToLearn);
                delete newLanguagesToLearn[language];
                onChange(newLanguagesToLearn);
              }
            },
            React.createElement(native_base_1.Icon, {
              style: {
                paddingRight: 0,
                marginRight: 0,
                paddingLeft: 0,
                marginLeft: 0
              },
              name: "delete-forever",
              type: "MaterialIcons",
              fontSize: 30
            })
          )
      )
    );
    firstRow = false;
  });
  return React.createElement(
    native_base_1.View,
    null,
    React.createElement(
      native_base_1.View,
      { padder: true },
      React.createElement(
        native_base_1.Text,
        { style: { textDecorationLine: "underline" } },
        lang_1.default("Langage to learn")
      )
    ),
    rows,
    Object.keys(languagesToLearn).length <= 2 &&
      React.createElement(
        native_base_1.Button,
        {
          testID: "addBtn",
          transparent: true,
          primary: true,
          onPress: () => {
            onChange(
              Object.assign({}, languagesToLearn, addRow(languagesToLearn))
            );
          }
        },
        React.createElement(native_base_1.Icon, {
          name: "plus-circle",
          type: "FontAwesome",
          fontSize: 30
        }),
        React.createElement(
          native_base_1.Text,
          null,
          lang_1.default("Add a langage")
        )
      )
  );
};
exports.default = exports.LangsToLearnSelector;
