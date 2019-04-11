import { Formik, FormikActions, InjectedFormikProps } from "formik";
import {
  Button,
  Icon,
  Input,
  Item as FormItem,
  Label,
  Picker,
  Spinner,
  Text,
  View
} from "native-base";
import * as React from "react";
import * as Yup from "yup";

import LogoutButton from "./LogoutButton";

import { defaultProfileData, IProfileState } from "./profileReducer";
import lang from "./lang";
import { GooglePlacesInput } from "./GooglePlacesInput";
import { AgeSelector } from "./AgeSelector";
import AvatarSelector from "./AvatarSelector";
import LangsToLearnSelector from "./LangsToLearnSelector";
import LangsToTeachSelector from "./LangsToTeachSelector";
import { TeachLevel } from "../../TeachLevel";
import { LearnLevel } from "../../LearnLevel";
import { intersectObjKey } from "../../utils/utils";
import Language from "../../Language";
import { IProfile } from "../../rootReducers";
import { GenderSelector } from "./GenderSelector";
import firebase from "react-native-firebase";
import {
  NavigationEventSubscription,
  NavigationInjectedProps
} from "react-navigation";
import custom from "../../config/native-base-theme/variables/custom";
import { msgOnError } from "../../utils/utilsUi";
import Loading from "../../utils/Loading";

export type IProps = IProfileState &
  NavigationInjectedProps & {
    loadProfile: () => void;
    updateProfile: (
      values: IProfile,
      action: FormikActions<IProfile | undefined>
    ) => void;
  };

class ProfileScreen extends React.Component<IProps> {
  navListener: NavigationEventSubscription | undefined;
  public componentWillUnmount() {
    if (this.navListener) this.navListener.remove();
  }
  public componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.props.loadProfile();
      }
    );
  }

  public render() {
    return (
      <View>
        <View>
          <Formik
            enableReinitialize
            initialValues={this.props.profileLoad.data || defaultProfileData}
            validationSchema={getValidationSchema()}
            onSubmit={(values, actions) => {
              if (values) this.props.updateProfile(values, actions);
            }}
          >
            {(injectedProps: InjectedFormikProps<IProfile, IProfile>) => (
              <FormUi {...injectedProps} {...this.props} />
            )}
          </Formik>
        </View>
        <LogoutButton />
      </View>
    );
  }
}

export const FormUi = ({
  handleChange,
  setFieldTouched,
  handleSubmit,
  isSubmitting,
  values,
  errors,
  touched,
  dirty,
  profileLoad,
  profileUpdate,
  setFieldValue
}: InjectedFormikProps<IProfile, IProfile> & IProps) => {
  return (
    <View>
      <View padder>
        {profileLoad.fetching && <Loading />}
        {profileLoad.error && (
          <Text
            style={{
              color: custom.brandDanger,
              alignSelf: "center"
            }}
          >
            {lang("Impossible to load the profile")}
          </Text>
        )}
        <FormItem
          stackedLabel
          error={touched!.pseudo && errors!.pseudo !== undefined}
        >
          <Label>{lang("Pseudo")}</Label>
          <Input
            onChangeText={handleChange("pseudo")}
            onBlur={() => setFieldTouched("pseudo")}
            value={values!.pseudo}
          />
        </FormItem>
        {msgOnError(touched!.pseudo, errors!.pseudo)}
        <FormItem
          stackedLabel
          error={touched!.profession && errors!.profession !== undefined}
        >
          <Label>{lang("Profession")}</Label>
          <Input
            onChangeText={handleChange("profession")}
            onBlur={() => setFieldTouched("profession")}
            value={values!.profession}
          />
        </FormItem>
        {msgOnError(touched!.profession, errors!.profession)}
        <View
          style={{
            marginTop: 5,
            borderBottomColor: custom.inputBorderColor,
            borderBottomWidth: 2
          }}
        >
          <Text
            style={{
              color: custom.inputColorPlaceholder,
              fontSize: 15,
              marginLeft: 4
            }}
          >
            {lang("City")}
          </Text>
          <GooglePlacesInput
            city={values!.city || ""}
            onChange={(city, lat, lon) => {
              setFieldValue("city", city);
              setFieldTouched("city");
              setFieldValue("lat", lat);
              setFieldValue("lon", lon);
            }}
          />
          {msgOnError(touched!.city, errors!.city)}
        </View>
        <AgeSelector
          value={values!.age || 18}
          onChange={age => {
            setFieldValue("age", age);
          }}
        />
        <AvatarSelector
          value={values!.avatar}
          onChange={avatar => {
            setFieldValue("avatar", avatar);
          }}
        />
        <GenderSelector
          value={values!.isMale}
          onChange={isMale => {
            setFieldValue("isMale", isMale);
          }}
        />
        <LangsToLearnSelector
          languagesToLearn={
            values!.langsToLearn || { english: LearnLevel.beginner }
          }
          onChange={(langsToLearn: { [key: string]: string }) => {
            setFieldValue("langsToLearn", langsToLearn);
            setFieldTouched("langsToLearn");
          }}
        />
        <LangsToTeachSelector
          languagesToTeach={
            values!.langsToTeach || { english: TeachLevel.native }
          }
          onChange={(langsToTeach: { [key: string]: string }) => {
            setFieldValue("langsToTeach", langsToTeach);
            setFieldTouched("langsToLearn");
          }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {msgOnError(touched!.langsToLearn, errors!.langsToLearn)}
          {msgOnError(touched!.pseudo, errors!.pseudo)}
          {msgOnError(touched!.profession, errors!.profession)}
          {msgOnError(touched!.city, errors!.city)}
        </View>
      </View>

      <View padder>
        <Button
          block
          rounded
          success
          onPress={() => handleSubmit()}
          disabled={
            isSubmitting || profileUpdate.fetching
          }
          testID={"updateBtn"}
        >
          {profileUpdate.fetching || (
            <Icon
              name="cloud-sync"
              color="white"
              type="MaterialCommunityIcons"
              fontSize={30}
            />
          )}
          {profileUpdate.fetching && (
            <Icon name="spinner" color="white" type="EvilIcons" fontSize={30} />
          )}
          <Text>{lang("Update Profile")}</Text>
        </Button>

        {profileUpdate.error && (
          <Text
            style={{
              color: custom.brandDanger,
              alignSelf: "center"
            }}
          >
            {lang("Update impossible")}
          </Text>
        )}
      </View>
    </View>
  );
};

export function getValidationSchema() {
  return Yup.object().shape({
    pseudo: Yup.string()
      .min(3, lang("Pseudo has to be longer than 3 characters!"))
      .required(lang("Pseudo is required!")),
    profession: Yup.string()
      .min(3, lang("Profession has to be longer than 3 characters!"))
      .required(lang("Profession is required!")),
    city: Yup.string()
      .required(lang("Please select a city"))
      .notOneOf([lang("Current location")], lang("Please select a city")),
    lat: Yup.number().required(lang("Please select a city")),
    lon: Yup.number().required(lang("Please select a city")),
    langsToLearn: Yup.lazy(value => {
      return Yup.object().test({
        test(langsToLearn) {
          // eslint-disable-next-line no-invalid-this
          const langsToTeach = this.parent.langsToTeach;
          let intersection = intersectObjKey(langsToLearn, langsToTeach);
          intersection = intersection.filter(
            language =>
              !(
                langsToLearn[language] === LearnLevel.fluent &&
                langsToTeach[language] === TeachLevel.fluent
              )
          );
          // eslint-disable-next-line no-invalid-this
          return (
            intersection.length === 0 ||
            this.createError({
              path: "langsToLearn",
              message: lang("You couldn't teach and learn {lang}", {
                lang: Language.lang(intersection[0])
              })
            })
          );
        }
      });
    })
  });
}

export default ProfileScreen;
