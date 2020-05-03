import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import ProgressCircle from "react-native-progress-circle";

import {
  diffDays,
  weightTrackerInfo,
  percentageProgress,
  HealthTips
} from "../utils/equations";
import WeightTodayFormik from "../components/WeightTodayFormik";
import WeightInfo from "../components/Modals/WeightInfo";
import DeleteGoalInfo from "../components/Modals/DeleteGoalInfo";
import HealthTipsInfo from "../components/Modals/HealthTipsInfo";
import FloatingLabelInput from "../utils/FloatingLabelInput";

import {
  setWeightDataActionCreator,
  setFinishDateActionCreator,
  clearActualGoalActionCreator,
  clearActualGoalSaveWeightsActionCreator,
  clearFinishDateOnlyActionCreator
} from "../redux-toolkit/reducers/data.reducer";
import { State } from "../redux-toolkit/interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWeight, faBullseye } from "@fortawesome/free-solid-svg-icons";
import Colors from "../utils/Colors";
import { globalStyles } from "../utils/globalStyles";
import { api } from "../utils/axios";

const validationSchema = yup.object({
  weight: yup
    .string()
    .matches(/^[0-9]{1,2}([,.][0-9]{1,2})?$/, { message: "Only numbers" })
    .required("Weight is required")
    .min(2),
  weightGoal: yup
    .string()
    .matches(/^[0-9]{1,2}([,.][0-9]{1,2})?$/, { message: "Only numbers" })
    .required("Weight is required")
    .min(2)
});

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const WeightTracker: React.FC<Props> = ({ navigation }) => {
  const userData = useSelector((state: State) => state.data);
  const dispatch = useDispatch();
  const [date, setDate] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const setDateTimePicker = (date: {
    nativeEvent: { timestamp: number };
    type: string;
  }) => {
    let time = moment(date.nativeEvent.timestamp).format("YYYY-MM-DD");
    setShow(false);
    setDate(time);
    api
      .post("./finishDate", {
        finish: time,
        start: new Date().toISOString().slice(0, 10)
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setFinishDateActionCreator(res.data));
      });
  };

  const { weightGoal, finish, dailyWeightArray } = userData;
  const weightToday = dailyWeightArray.length
    ? dailyWeightArray[dailyWeightArray.length - 1].weight
    : 0;
  const weightYesterday =
    dailyWeightArray.length > 1
      ? dailyWeightArray[dailyWeightArray.length - 2].weight
      : 0;

  const [daysCompletionPercentage, kgCompletionPercentage] = percentageProgress(
    userData,
    diffDays
  );
  const healthTips = HealthTips(userData, diffDays);

  const clearGoal = () => {
    api.delete("./clearActualGoal").then((res) => {
      console.log(res.data);
      dispatch(clearActualGoalActionCreator(res.data));
    });
  };

  const clearGoalSaveWeights = () => {
    api.delete("./clearActualGoalSaveWeights").then((res) => {
      console.log(res.data);
      dispatch(clearActualGoalSaveWeightsActionCreator(res.data));
    });
  };

  const clearFinish = () => {
    api.delete("./clearFinish").then((res) => {
      console.log(res.data);
      dispatch(clearFinishDateOnlyActionCreator(res.data));
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={globalStyles.container}>
          {!finish ? (
            <>
              {/* Formik actual weight & weight goal */}
              <Formik
                initialValues={{
                  weight: userData.weight || 0,
                  weightGoal: userData.weightGoal || 0
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  api
                    .post("/weightData", {
                      weight: values.weight,
                      weightGoal: values.weightGoal
                    })
                    .then((res) => {
                      console.log(res);
                      dispatch(setWeightDataActionCreator(res.data));
                    });

                  setShow(true);
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
                  <View
                    style={{ ...globalStyles.container, paddingVertical: 0 }}
                  >
                    <Text style={globalStyles.header}>Add your data</Text>
                    <View>
                      <View style={styles.inputRowContainer}>
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
                              onChangeText={handleChange("weight")}
                              onBlur={handleBlur("weight")}
                              value={values.weight}
                              label="Weight (kg)"
                              keyboardType="numeric"
                            />
                          </View>
                          <Text style={globalStyles.errorText}>
                            {touched.weight && errors.weight}
                          </Text>
                        </View>

                        <View>
                          <View style={styles.inputContainer}>
                            <View>
                              <FontAwesomeIcon
                                icon={faBullseye}
                                color={Colors.primary}
                                size={36}
                              />
                            </View>
                            <FloatingLabelInput
                              onChangeText={handleChange("weightGoal")}
                              onBlur={handleBlur("weightGoal")}
                              value={values.weightGoal}
                              label="Goal (kg)"
                              keyboardType="numeric"
                            />
                          </View>
                          <Text style={globalStyles.errorText}>
                            {touched.weightGoal && errors.weightGoal}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.button}>
                      <Button
                        title={
                          weightGoal
                            ? "Change goal & set deadline"
                            : "Add goal & set dealdline"
                        }
                        color={Colors.primary}
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                )}
              </Formik>

              {/* Set finish date - DatePicker */}
              <View>
                <Text>
                  {weightGoal && show && (
                    <DateTimePicker
                      value={new Date()}
                      mode="date"
                      display="calendar"
                      onChange={(date: any) => setDateTimePicker(date)}
                    />
                  )}
                </Text>
              </View>
            </>
          ) : (
            <>
              {/* Set today`s weight */}
              <WeightTodayFormik />

              {/* Weight change since yesterday */}
              <View>
                {weightToday === weightYesterday ? (
                  <Text style={styles.text}>The same weight as yesterday</Text>
                ) : dailyWeightArray.length >= 2 ? (
                  <>
                    <Text style={styles.text}>
                      Actual weight {weightToday}kg
                    </Text>

                    <Text style={styles.text}>
                      {Math.abs(+weightToday - +weightYesterday).toFixed(1)}kg
                      {+weightToday - +weightYesterday < 0
                        ? " less"
                        : " more"}{" "}
                      than yesterday
                    </Text>
                  </>
                ) : (
                  <Text style={styles.text}>Actual weight {weightToday}kg</Text>
                )}
              </View>

              <Text style={styles.text}>
                {diffDays(finish)} days left and {weightTrackerInfo(userData)}
              </Text>

              <View style={styles.tipsContainer}>
                <HealthTipsInfo
                  healthTips={healthTips}
                  dailyWeightArray={dailyWeightArray}
                  clearFinish={clearFinish}
                  style={{ marginVertical: 10, width: "45%" }}
                />
                <WeightInfo style={{ marginVertical: 10, width: "45%" }} />
              </View>

              {/* Circular Progress */}
              <View style={styles.circularProgressContainer}>
                <View style={styles.circularProgress}>
                  <Text style={{ fontSize: 20 }}>Time progress</Text>
                  <ProgressCircle
                    percent={daysCompletionPercentage}
                    radius={50}
                    borderWidth={12}
                    color={Colors.primary}
                    shadowColor="#999"
                    bgColor="#fff"
                  >
                    <Text
                      style={{ fontSize: 18 }}
                    >{`${daysCompletionPercentage}%`}</Text>
                  </ProgressCircle>
                </View>

                <View style={styles.circularProgress}>
                  <Text style={{ fontSize: 20 }}>Weight progress</Text>
                  <ProgressCircle
                    percent={kgCompletionPercentage}
                    radius={50}
                    borderWidth={12}
                    color={Colors.primary}
                    shadowColor="#999"
                    bgColor="#fff"
                  >
                    <Text
                      style={{ fontSize: 18 }}
                    >{`${kgCompletionPercentage}%`}</Text>
                  </ProgressCircle>
                </View>
              </View>

              <Button
                color={Colors.primary}
                onPress={() => navigation.navigate("Weight Statistics")}
                title="Check some statistics about your weight"
              />
            </>
          )}

          <DeleteGoalInfo
            clearGoal={clearGoal}
            clearGoalSaveWeights={clearGoalSaveWeights}
            clearFinish={clearFinish}
            style={{ marginVertical: 30 }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputRowContainer: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 10,
    marginVertical: 25,
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: "row",
    width: "55%",
    marginHorizontal: 10,
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: { paddingVertical: 15, width: "80%" },
  tipsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly"
  },
  circularProgressContainer: {
    marginVertical: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly"
  },
  circularProgress: {
    height: 140,
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: { fontSize: 22, padding: 10, textAlign: "center" }
});

export default WeightTracker;
