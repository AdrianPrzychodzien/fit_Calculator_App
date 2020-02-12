import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { Formik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import { diffDays, weightTrackerInfo, percentageProgress, HealthTips } from '../utils/equations'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWeight, faBullseye } from '@fortawesome/free-solid-svg-icons'
import {
  setWeightData, setFinishDate, setDailyWeight,
  clearActualGoal, clearActualGoalSaveWeights, clearFinishDateOnly
} from '../redux/actions'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'

const validationSchema = yup.object({
  weight: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Weight is required').min(2),
  weightGoal: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Weight is required').min(2)
})

const WeightTracker = ({
  userData,
  setWeightData,
  setFinishDate,
  setDailyWeight,
  clearActualGoal,
  clearActualGoalSaveWeights,
  clearFinishDateOnly,
  navigation
}) => {
  const [date, setDate] = useState(null)
  const [show, setShow] = useState(false)

  const setDateTimePicker = date => {
    // let _date = date.nativeEvent.timestamp
    // let _dateFormat = new Date(_date)
    let time = moment(date.nativeEvent.timestamp).format('YYYY-MM-DD')
    setDate(time)
    setShow(false)
  }

  console.log(date)

  const { weightGoal, finish, dailyWeightArray } = userData
  // const weightToday = dailyWeightArray.length ? dailyWeightArray[dailyWeightArray.length - 1].weight : null
  // const weightYesterday = dailyWeightArray.length > 1 ? dailyWeightArray[dailyWeightArray.length - 2].weight : null

  // if input in DatePicker is empty set finish date to 4 weeks from today
  // let finishDate = (new Date(date).toISOString().slice(0, 10) === '1970-01-01')
  //   ? (moment().startOf('today').add(3, 'weeks')._d).toISOString().slice(0, 10)
  //   : new Date(date).toISOString().slice(0, 10)

  const [daysCompletionPercentage, kgCompletionPercentage] = percentageProgress(userData, diffDays)
  const healthTips = HealthTips(userData, diffDays)

  const clearGoal = () => {
    clearActualGoal({
      start: '',
      finish: '',
      weightGoal: '',
      dailyWeightArray: []
    })
  }

  const clearGoalSaveWeights = () => {
    clearActualGoalSaveWeights({
      start: '',
      finish: '',
      weightGoal: ''
    })
  }

  const clearFinish = () => {
    clearFinishDateOnly({
      finish: ''
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={globalStyles.container}>
          <Formik initialValues={{
            weight: userData.weight || '',
            weightGoal: userData.weightGoal || ''
          }}
            validationSchema={validationSchema}
            onSubmit={values => {
              setWeightData({
                weight: values.weight,
                weightGoal: values.weightGoal
              })
              setDailyWeight({
                date: new Date().toISOString().slice(0, 10),
                weight: values.weight,
              })
              setShow(true)
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <View style={{ ...globalStyles.container, paddingVertical: 0 }} >
                <Text style={globalStyles.header}>Add your data??</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputSubcontainer}>
                      <View>
                        <FontAwesomeIcon icon={faWeight} color={Colors.primary} size={36} />
                      </View>
                      <TextInput style={styles.input}
                        onChangeText={handleChange('weight')}
                        onBlur={handleBlur('weight')}
                        value={values.weight}
                        placeholder="Weight (kg)"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text style={styles.errorText}>{touched.weight && errors.weight}</Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.inputSubcontainer}>
                      <View>
                        <FontAwesomeIcon icon={faBullseye} color={Colors.primary} size={36} />
                      </View>
                      <TextInput style={styles.input}
                        onChangeText={handleChange('weightGoal')}
                        onBlur={handleBlur('weightGoal')}
                        value={values.weightGoal}
                        placeholder="Goal (kg)"
                        keyboardType="numeric"
                      />
                    </View>
                    <Text style={styles.errorText}>{touched.weightGoal && errors.weightGoal}</Text>
                  </View>
                </View>

                <View style={styles.button}>
                  <Button
                    title={weightGoal ? 'Change' : 'Add'}
                    color={Colors.primary}
                    onPress={handleSubmit}
                  />
                </View>

              </View>
            )}
          </Formik>

          {/* Set finish date - DatePicker */}
          {weightGoal && <View>
            {/* <View>
              <Button onPress={() => setShow(true)} title="Show date picker!" />
            </View> */}
            {show && <DateTimePicker value={new Date(2020, 4, 4)}
              mode='date'
              display="calendar"
              onChange={setDateTimePicker}
            />}
          </View>
          }
        </View >
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}



const styles = StyleSheet.create({
  inputContainer: {
    width: '50%',
    marginHorizontal: 15,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputSubcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    width: 90,
    padding: 10,
    marginLeft: 10
  },
  button: {
    paddingVertical: 15,
    width: '60%'
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center'
  }
})

const mapStateToProps = ({ data }) => ({
  userData: data
})

const mapDispatchToProps = dispatch => ({
  setWeightData: data => dispatch(setWeightData(data)),
  setFinishDate: data => dispatch(setFinishDate(data)),
  setDailyWeight: data => dispatch(setDailyWeight(data)),
  clearActualGoal: data => dispatch(clearActualGoal(data)),
  clearActualGoalSaveWeights: data => dispatch(clearActualGoalSaveWeights(data)),
  clearFinishDateOnly: data => dispatch(clearFinishDateOnly(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(WeightTracker)