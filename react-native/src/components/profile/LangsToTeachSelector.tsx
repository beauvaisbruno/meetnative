import { View, Text, Picker, Icon, Button } from "native-base";
import * as React from "react";
import lang from "./lang";
import Language from "../../Language";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { TeachLevel } from "../../TeachLevel";
import { createLangPickers } from "../../utils/utilsUi";

function addRow(languagesToTeach: {
  [key: string]: string;
}): { [key: string]: string } {
  for (const language of Language.all) {
    if (languagesToTeach[language] === undefined) {
      const notUsedLangObj: { [key: string]: string } = {};
      notUsedLangObj[language] = TeachLevel.fluent;
      return notUsedLangObj;
    }
  }
  return {};
}

const createLevels = () => {
  const rows: JSX.Element[] = [];
  TeachLevel.all.forEach((level: string) => {
    rows.push(
      <Picker.Item label={TeachLevel.lang(level)} value={level} key={level} />
    );
  });
  return rows;
};

export const LangsToTeachSelector = ({
  languagesToTeach,
  onChange
}: {
  languagesToTeach: { [key: string]: string };
  onChange: (languagesToTeach: { [key: string]: string }) => void;
}) => {
  const rows: JSX.Element[] = [];
  let firstRow = true;
  Object.keys(languagesToTeach).forEach((language: string) => {
    rows.push(
      <View key={language} style={{ flexDirection: "row" }}>
        <View key={language} style={{ width: wp("35%") }}>
          <Picker
            testID={"lang-" + language}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={language}
            onValueChange={(newLanguage: string) => {
              const newLanguagesToTeach = { ...languagesToTeach };
              newLanguagesToTeach[newLanguage] = languagesToTeach[language];
              delete newLanguagesToTeach[language];
              onChange(newLanguagesToTeach);
            }}
          >
            {createLangPickers()}
          </Picker>
        </View>
        <View key={languagesToTeach[language]} style={{ width: wp("50%") }}>
          <Picker
            testID={"level-" + language}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={languagesToTeach[language]}
            onValueChange={(newLevel: string) => {
              const newLanguagesToTeach = { ...languagesToTeach };
              newLanguagesToTeach[language] = newLevel;
              onChange(newLanguagesToTeach);
            }}
          >
            {createLevels()}
          </Picker>
        </View>
        {Object.keys(languagesToTeach).length > 1 && (
          <Button
            testID={"delete-" + language}
            transparent
            primary
            onPress={() => {
              const newLanguagesToTeach = { ...languagesToTeach };
              delete newLanguagesToTeach[language];
              onChange(newLanguagesToTeach);
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
          {lang("Langage to teach")}
        </Text>
      </View>
      {rows}
      {Object.keys(languagesToTeach).length <= 2 && (
        <Button
          testID={"addBtn"}
          transparent
          primary
          onPress={() => {
            onChange({ ...languagesToTeach, ...addRow(languagesToTeach) });
          }}
        >
          <Icon name="plus-circle" type="FontAwesome" fontSize={30} />
          <Text>{lang("Add a langage")}</Text>
        </Button>
      )}
    </View>
  );
};

export default LangsToTeachSelector;
