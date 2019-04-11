import { Icon, Picker } from "native-base";
import lang from "./lang";
import * as React from "react";
import custom from "../../config/native-base-theme/variables/custom";

const createRows = () => {
  const rows = [];
  for (let i = 18; i < 77; i++) {
    rows.push(
      //@ts-ignore
      <Picker.Item label={lang("{age} yo", { age: i })} value={i} key={i} />
    );
  }
  return rows;
};

export const AgeSelector = ({
  value,
  onChange
}: {
  value: number;
  onChange: (age: number) => void;
}) => {
  return (
    <Picker
      testID={"picker"}
      mode="dropdown"
      iosIcon={<Icon name="arrow-down" />}
      placeholder={lang("Select your age")}
      placeholderStyle={{ color: custom.textGrey }}
      placeholderIconColor={custom.textGrey}
      style={{ width: undefined }}
      selectedValue={value}
      onValueChange={(age: number) => {
        onChange(age);
      }}
    >
      {createRows()}
    </Picker>
  );
};
