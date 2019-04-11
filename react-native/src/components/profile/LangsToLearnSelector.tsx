import { View, Text, Picker, Icon, Button } from "native-base";
import * as React from "react";
import lang from "./lang";
import Language from "../../Language";
import { LearnLevel } from "../../LearnLevel";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createLangPickers } from "../../utils/utilsUi";

function addRow(languagesToLearn: {
  [key: string]: string;
}): { [key: string]: string } {
  for (const language of Language.all) {
    if (languagesToLearn[language] === undefined) {
      const notUsedLangObj: { [key: string]: string } = {};
      notUsedLangObj[language] = LearnLevel.beginner;
      return notUsedLangObj;
    }
  }
  return {};
}

const createLevels = () => {
  const rows: JSX.Element[] = [];
  LearnLevel.all.forEach((level: string) => {
    rows.push(
      <Picker.Item label={LearnLevel.lang(level)} value={level} key={level} />
    );
  });
  return rows;
};

export const LangsToLearnSelector = ({
  languagesToLearn,
  onChange
}: {
  languagesToLearn: { [key: string]: string };
  onChange: (languagesToLearn: { [key: string]: string }) => void;
}) => {
  const rows: JSX.Element[] = [];
  let firstRow = true;
  Object.keys(languagesToLearn).forEach((language: string) => {
    rows.push(
      <View key={language} style={{ flexDirection: "row" }}>
        <View key={language} style={{ width: wp("35%") }}>
          <Picker
            testID={"lang-" + language}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={language}
            onValueChange={(newLanguage: string) => {
              const newLanguagesToLearn = { ...languagesToLearn };
              newLanguagesToLearn[newLanguage] = languagesToLearn[language];
              delete newLanguagesToLearn[language];
              onChange(newLanguagesToLearn);
            }}
          >
            {createLangPickers()}
          </Picker>
        </View>
        <View key={languagesToLearn[language]} style={{ width: wp("50%") }}>
          <Picker
            testID={"level-" + language}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={languagesToLearn[language]}
            onValueChange={(newLevel: string) => {
              const newLanguagesToLearn = { ...languagesToLearn };
              newLanguagesToLearn[language] = newLevel;
              onChange(newLanguagesToLearn);
            }}
          >
            {createLevels()}
          </Picker>
        </View>
        {Object.keys(languagesToLearn).length > 1 && (
          <Button
            testID={"delete-" + language}
            transparent
            primary
            onPress={() => {
              const newLanguagesToLearn = { ...languagesToLearn };
              delete newLanguagesToLearn[language];
              onChange(newLanguagesToLearn);
            }}
          >
            <Icon
              style={{
                paddingRight: 0,
                marginRight: 0,
                paddingLeft: 0,
                marginLeft: 0
              }}
              name="delete-forever"
              type="MaterialIcons"
              fontSize={30}
            />
          </Button>
        )}
      </View>
    );
    firstRow = false;
  });
  return (
    <View>
      <View padder>
        <Text style={{ textDecorationLine: "underline" }}>
          {lang("Langage to learn")}
        </Text>
      </View>
      {rows}
      {Object.keys(languagesToLearn).length <= 2 && (
        <Button
          testID={"addBtn"}
          transparent
          primary
          onPress={() => {
            onChange({ ...languagesToLearn, ...addRow(languagesToLearn) });
          }}
        >
          <Icon name="plus-circle" type="FontAwesome" fontSize={30} />
          <Text>{lang("Add a langage")}</Text>
        </Button>
      )}
    </View>
  );
};

export default LangsToLearnSelector;
