import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationScreenProp } from "react-navigation";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import {
  setDataActionCreator,
  setDailyWeightActionCreator
} from "../redux-toolkit/reducers/data.reducer";
import { State } from "../redux-toolkit/interfaces";
import ActivityInfo from "../components/Modals/ActivityInfo";
import BodyFatInfo from "../components/Modals/BodyFatInfo";
import FloatingLabelInput from "../utils/FloatingLabelInput";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBirthdayCake,
  faArrowsAltV,
  faWeight,
  faPercentage
} from "@fortawesome/free-solid-svg-icons";
import Colors from "../utils/Colors";
import { globalStyles } from "../utils/globalStyles";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import StarRating from "react-native-star-rating";
import { api } from "../utils/axios";

const validationSchema = yup.object({
  height: yup
    .string()
    .matches(/^[0-9]*$/, { message: "Only numbers" })
    .required("Height is required")
    .min(2),
  weight: yup
    .string()
    .matches(/^[0-9]*$/, { message: "Only numbers" })
    .required("Weight is required")
    .min(2),
  age: yup
    .string()
    .matches(/^[0-9]*$/, { message: "Only numbers" })
    .required("Age is required"),
  fat: yup.string().matches(/^[0-9]*$/, { message: "Only numbers" }),
  sex: yup.string().required(),
  lifeActivity: yup.string().required()
});

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const PersonalData: React.FC<Props> = ({ navigation }) => {
  const userData = useSelector((state: State) => state.data);
  const dispatch = useDispatch();
  const [option, setOption] = useState<string>(userData.sex || "Male");
  const [stars, setStars] = useState<number>(userData.lifeActivity || 0);

  const displayInfo = (num: number): string | undefined => {
    let output;
    switch (num) {
      case 1:
        output = "Sedentary";
        break;
      case 2:
        output = "Light exercise";
        break;
      case 3:
        output = "Moderate exercise";
        break;
      case 4:
        output = "Heavy exercise";
        break;
      case 5:
        output = "Athlete";
        break;
      default:
        break;
    }
    return output;
  };

  const radio_props = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 }
  ];

  const handleSubmit = (values: any) => {
    api
      .post("/personalData", {
        weight: values.weight,
        height: values.height,
        age: values.age,
        fat: values.fat,
        sex: option,
        lifeActivity: stars
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setDataActionCreator(res.data));
      })
      .catch((err) => console.log(err));

    api
      .post("/dailyWeight", {
        date: new Date().toISOString().slice(0, 10),
        weight: values.weight
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setDailyWeightActionCreator(res.data));
      })
      .catch((err) => console.log(err));

    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={globalStyles.container}>
          <Formik
            initialValues={{
              height: userData.height || 0,
              weight: userData.weight || 0,
              age: userData.age || 0,
              fat: userData.fat || 0,
              sex: userData.sex || "male",
              lifeActivity: userData.lifeActivity || 3
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched
            }) => (
              <View style={{ ...globalStyles.container, paddingVertical: 0 }}>
                <Text style={{ ...globalStyles.header, marginBottom: 15 }}>
                  Add your personal data
                </Text>
                <View>
                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon
                        icon={faArrowsAltV}
                        color={Colors.primary}
                        size={36}
                      />
                    </View>
                    <FloatingLabelInput
                      label="Height (cm)"
                      onChangeText={handleChange("height")}
                      onBlur={handleBlur("height")}
                      value={values.height}
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={globalStyles.errorText}>
                    {touched.height && errors.height}
                  </Text>

                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon
                        icon={faWeight}
                        color={Colors.primary}
                        size={36}
                      />
                    </View>
                    <FloatingLabelInput
                      onChangeText={handleChange("weight")}
                      onBlur={handleBlur("weight")}
                      value={values.weight}
                      label="Weight (cm)"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={globalStyles.errorText}>
                    {touched.weight && errors.weight}
                  </Text>

                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon
                        icon={faBirthdayCake}
                        color={Colors.primary}
                        size={36}
                      />
                    </View>
                    <FloatingLabelInput
                      onChangeText={handleChange("age")}
                      onBlur={handleBlur("age")}
                      value={values.age}
                      label="Age"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={globalStyles.errorText}>
                    {touched.age && errors.age}
                  </Text>

                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon
                        icon={faPercentage}
                        color={Colors.primary}
                        size={36}
                      />
                    </View>
                    <FloatingLabelInput
                      onChangeText={handleChange("fat")}
                      onBlur={handleBlur("fat")}
                      value={values.fat}
                      label="Fat %"
                      keyboardType="numeric"
                    />
                    <BodyFatInfo navigation={navigation} />
                  </View>
                  <Text style={globalStyles.errorText}>
                    {touched.fat && errors.fat}
                  </Text>

                  <View style={styles.inputContainer}>
                    <RadioForm formHorizontal={true} animation={true}>
                      {radio_props.map(
                        (obj: { label: string; value: number }, i: number) => (
                          <RadioButton labelHorizontal={true} key={i}>
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={option === obj.label}
                              onPress={(value: number) =>
                                setOption(value === 0 ? "Male" : "Female")
                              }
                              borderWidth={3}
                              buttonInnerColor={Colors.primary}
                              // buttonOuterColor={option === i ? Colors.primary : Colors.primary}
                              buttonOuterColor={
                                option === obj.label
                                  ? Colors.primary
                                  : Colors.primary
                              }
                              buttonSize={10}
                              buttonOuterSize={20}
                              buttonStyle={{}}
                              buttonWrapStyle={{ marginLeft: 25 }}
                            />
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              onPress={(value: number) =>
                                setOption(value === 0 ? "Male" : "Female")
                              }
                              labelStyle={{ fontSize: 20, paddingVertical: 2 }}
                              labelWrapStyle={{}}
                            />
                          </RadioButton>
                        )
                      )}
                    </RadioForm>
                  </View>

                  <View style={styles.stars}>
                    <View style={styles.lifeActivityContainer}>
                      <Text style={styles.lifeActivity}>
                        Life activity: {displayInfo(stars)}
                      </Text>
                      <ActivityInfo style={{ marginLeft: 10 }} />
                    </View>

                    <StarRating
                      fullStarColor={Colors.primary}
                      disabled={false}
                      maxStars={5}
                      rating={stars}
                      selectedStar={(rating: number) => setStars(rating)}
                    />
                  </View>
                </View>

                <View style={styles.button}>
                  <Button
                    title="submit"
                    color={Colors.primary}
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    marginHorizontal: 15,
    marginTop: 20,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  stars: {
    marginVertical: 10
  },
  button: {
    paddingVertical: 15
  },
  lifeActivityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  lifeActivity: {
    flexDirection: "row",
    fontSize: 17,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default PersonalData;
