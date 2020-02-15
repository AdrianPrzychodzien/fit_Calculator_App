import React from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

import { Formik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'

const validationSchema = yup.object({
  dailyWeight: yup.string().matches(/^[0-9]{1,2}([,.][0-9]{1,2})?$/, { message: 'Only numbers' }).required('Weight is required'),
})

const WeightTodayFormik = ({ setDailyWeight, userData }) => {
  const { dailyWeightArray } = userData

  const today = moment().toISOString().slice(0, 10)
  // const tomorrow = moment().add(1, 'days').toISOString().slice(0, 10)
  const lastWeightData = dailyWeightArray[dailyWeightArray.length - 1].date
  const theSameDay = moment(today).isSame(lastWeightData)

  return (
    <Formik initialValues={{
      dailyWeight: theSameDay ? (userData.weight || '') : '',
    }}
      validationSchema={validationSchema}
      onSubmit={values => {
        setDailyWeight({
          date: new Date().toISOString().slice(0, 10),
          weight: values.dailyWeight
        })
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
        <View style={{ ...globalStyles.container, paddingVertical: 0 }} >
          <Text style={globalStyles.header}>Weight today</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input}
                onChangeText={handleChange('dailyWeight')}
                onBlur={handleBlur('dailyWeight')}
                value={values.dailyWeight}
                placeholder="dailyWeight (kg)"
                keyboardType="numeric"
              />
              <Text style={styles.errorText}>{touched.dailyWeight && errors.dailyWeight}</Text>
            </View>
          </View>

          <View style={styles.button}>
            <Button
              title='submit'
              color={Colors.primary}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
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
  input: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    width: 90,
    padding: 10,
    marginLeft: 10
  },
  button: { paddingVertical: 15, width: '80%' },
  errorText: { fontSize: 12, color: 'red', textAlign: 'center' }
})

export default WeightTodayFormik