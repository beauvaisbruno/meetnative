import { Icon, Picker } from "native-base";
import lang from "./lang";
import * as React from "react";
import custom from "../../config/native-base-theme/variables/custom";
export const GenderSelector = ({
  value,
  onChange
}: {
  value: boolean;
  onChange: (age: boolean) => void;
}) => {
  return (
    <Picker
      testID={"picker"}
      mode="dropdown"
      iosIcon={<Icon name="arrow-down" />}
      placeholder={lang("Select your gender")}
      placeholderStyle={{ color: custom.textGrey }}
      placeholderIconColor={custom.textGrey}
      style={{ width: undefined }}
      selectedValue={value}
      onValueChange={(isMale: boolean) => {
        onChange(isMale);
      }}
    >
      <Picker.Item label={lang("Male")} value={true} key={"Male"} />
      <Picker.Item label={lang("Female")} value={false} key={"Female"} />
    </Picker>
  );
};
