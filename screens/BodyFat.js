import React from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { setFatData, setBodyFatCircum } from '../redux/actions'
import { bodyFatFormula, idealBodyFatPercentage } from '../utils/equations'
import FatPercentageInfo from '../components/Modals/FatPercentageInfo'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'

const validationSchema = yup.object({
  waist: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Waist is required'),
  hips: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Hips are required'),
  neck: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Neck is required')
})

const BodyFat = ({ setFatData, setBodyFatCircum, userData, circumData, navigation }) => {

  const { sex, height, weight } = userData
  const { waist, hips, neck } = circumData

  const bodyFat = bodyFatFormula(circumData, userData)
  const bodyFatMass = ((weight * bodyFat) / 100).toFixed(2)
  const leanBodyMass = (weight - bodyFatMass).toFixed(2)
  const bodyFatToLose = (bodyFat - idealBodyFatPercentage(userData)).toFixed(1)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={globalStyles.container}>
          <Formik initialValues={{
            waist: circumData.waist || '',
            hips: circumData.hips || '',
            neck: circumData.neck || '',
            fat: userData.fat || ''
          }}
            validationSchema={validationSchema}
            onSubmit={values => {
              setBodyFatCircum({
                waist: values.waist,
                hips: values.hips,
                neck: values.neck
              })
              setFatData({
                fat: bodyFat
              })
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <View style={{ ...globalStyles.container, paddingVertical: 0 }} >
                <Text style={globalStyles.header}>Add your circumferences</Text>
                <View>
                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon icon={faCheck} color={Colors.primary} size={36} />
                    </View>
                    <TextInput style={styles.input}
                      onChangeText={handleChange('waist')}
                      onBlur={handleBlur('waist')}
                      value={values.waist}
                      placeholder="Waist (cm)"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.errorText}>{touched.waist && errors.waist}</Text>

                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon icon={faCheck} color={Colors.primary} size={36} />
                    </View>
                    <TextInput style={styles.input}
                      onChangeText={handleChange('hips')}
                      onBlur={handleBlur('hips')}
                      value={values.hips}
                      placeholder="Hips (cm)"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.errorText}>{touched.hips && errors.hips}</Text>

                  <View style={styles.inputContainer}>
                    <View >
                      <FontAwesomeIcon icon={faCheck} color={Colors.primary} size={36} />
                    </View>
                    <TextInput style={styles.input}
                      onChangeText={handleChange('neck')}
                      onBlur={handleBlur('neck')}
                      value={values.neck}
                      placeholder="Neck (cm)"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.errorText}>{touched.neck && errors.neck}</Text>
                </View>

                <View style={styles.button}>
                  <Button title="calculate" color={Colors.primary} onPress={handleSubmit} />
                </View>

              </View>
            )}
          </Formik>

          {sex && height ? (
            <View style={styles.userInfo}>
              <View style={globalStyles.infoContainer}>
                <Text style={styles.info}>
                  Body fat:
              </Text>
                <Text style={styles.data}>
                  {waist && hips && neck && bodyFat + '%'}
                </Text>
                <FatPercentageInfo />
              </View>

              <View style={globalStyles.infoContainer}>
                <Text style={styles.info}>
                  Body fat mass:
              </Text>
                <Text style={styles.data}>
                  {waist && hips && neck && bodyFatMass + 'kg'}
                </Text>
              </View>

              <View style={globalStyles.infoContainer}>
                <Text style={styles.info}>
                  Lean body mass:
              </Text>
                <Text style={styles.data}>
                  {waist && hips && neck && leanBodyMass + 'kg'}
                </Text>
              </View>

              <View style={globalStyles.infoContainer}>
                <Text style={styles.info}>
                  Ideal body fat:
                </Text>
                <Text style={styles.data}>
                  {waist && hips && neck && idealBodyFatPercentage(userData) + '%'}
                </Text>
              </View>

              <View style={globalStyles.infoContainer}>
                {waist && hips && neck && bodyFatToLose > 0 ? (
                  <>
                    <Text style={styles.info}>
                      Need to lose minimum:
                  </Text>
                    <Text style={styles.data}>
                      {waist && hips && neck && bodyFatToLose + 'kg'}
                    </Text>
                  </>
                ) : (
                    <Text style={styles.info}>You are below ideal fat percentage!</Text>
                  )}
              </View>

            </View>
          ) : (
              <View style={{ marginVertical: 10 }}>
                <Text style={{ textAlign: 'center', paddingVertical: 10, fontSize: 18 }}>
                  Make sure you added information about your sex and height!
                  </Text>
                <Text style={{ textAlign: 'center', paddingVertical: 10, fontSize: 18 }}>
                  This data are necessary to make calculations
                  </Text>
                <View style={styles.button}>
                  <Button title="Add data" color={Colors.secondary} onPress={() => navigation.navigate('Personal Data')} />
                </View>
              </View>
            )}
        </View >
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '60%',
    marginHorizontal: 15,
    paddingTop: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    width: 120,
    padding: 10
  },
  button: { paddingVertical: 15 },
  errorText: { fontSize: 12, color: 'red', textAlign: 'center' },
  userInfo: { paddingVertical: 15, width: '85%', },
  info: { fontSize: 18 },
  data: { fontSize: 18, fontWeight: 'bold' }
})

const mapStateToProps = ({ data, circum }) => ({
  userData: data,
  circumData: circum
})

const mapDispatchToProps = dispatch => ({
  setFatData: data => dispatch(setFatData(data)),
  setBodyFatCircum: data => dispatch(setBodyFatCircum(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BodyFat)