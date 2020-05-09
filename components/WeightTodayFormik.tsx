import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Button } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import FloatingLabelInput from "../utils/FloatingLabelInput";
import { setDailyWeightActionCreator } from "../redux-toolkit/reducers/data.reducer";
import { State } from "../redux-toolkit/interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWeight } from "@fortawesome/free-solid-svg-icons";
import Colors from "../utils/Colors";
import { globalStyles } from "../utils/globalStyles";
import axios from "axios";

const validationSchema = yup.object({
  dailyWeight: yup
    .string()
    .matches(/^[0-9]{1,2}([,.][0-9]{1,2})?$/, { message: "Only numbers" })
    .required("Weight is required")
});

const WeightTodayFormik: React.FC = () => {
  const userData = useSelector((state: State) => state.data);
  const dispatch = useDispatch();

  const { dailyWeightArray } = userData;

  const today = moment().toISOString().slice(0, 10);
  const lastWeightData =
    dailyWeightArray.length > 0
      ? dailyWeightArray[dailyWeightArray.length - 1].date
      : "";
  const theSameDay =
    dailyWeightArray.length > 0 ? moment(today).isSame(lastWeightData) : false;

  return (
    <Formik
      initialValues={{
        dailyWeight: theSameDay ? userData.weight : ""
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios
          .post(
            "https://europe-west1-fit-calc-app.cloudfunctions.net/api/dailyWeight",
            {
              date: new Date().toISOString().slice(0, 10),
              weight: values.dailyWeight
            }
          )
          .then((res) => {
            console.log(res.data);
            dispatch(setDailyWeightActionCreator(res.data));
          });
      }}
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
          <Text style={{ ...globalStyles.header, marginBottom: 10 }}>
            Track your weight
          </Text>
          <View>
            <View style={styles.inputContainer}>
              <View>
                <FontAwesomeIcon
                  icon={faWeight}
                  color={Colors.primary}
                  size={36}
                />
              </View>
              <FloatingLabelInput
                onChangeText={handleChange("dailyWeight")}
                onBlur={handleBlur("dailyWeight")}
                value={values.dailyWeight}
                label="weight today"
                keyboardType="numeric"
              />
            </View>
            <Text style={globalStyles.errorText}>
              {touched.dailyWeight && errors.dailyWeight}
            </Text>
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
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "80%",
    marginHorizontal: 15,
    paddingTop: 20,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  button: { paddingVertical: 15, width: "80%" }
});

export default WeightTodayFormik;
