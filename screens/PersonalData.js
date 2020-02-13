import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { setData, setDailyWeight } from '../redux/actions'
import ActivityInfo from '../components/Modals/ActivityInfo'
import BodyFatInfo from '../components/Modals/BodyFatInfo'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBirthdayCake, faArrowsAltV, faWeight, faPercentage } from '@fortawesome/free-solid-svg-icons'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import StarRating from 'react-native-star-rating'

const validationSchema = yup.object({
  height: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Height is required').min(2),
  weight: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Weight is required').min(2),
  age: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }).required('Age is required'),
  fat: yup.string().matches(/^[0-9]*$/, { message: 'Only numbers' }),
  sex: yup.string().required(),
  lifeActivity: yup.string().required(),
})

const PersonalData = ({ userData, setData, setDailyWeight, navigation }) => {
  const [option, setOption] = useState(userData.sex || 'Male')
  const [stars, setStars] = useState(userData.lifeActivity || 0)

  const displayInfo = num => {
    let output
    switch (num) {
      case 1:
        output = 'Sedentary'
        break
      case 2:
        output = 'Light exercise'
        break
      case 3:
        output = 'Moderate exercise'
        break
      case 4:
        output = 'Heavy exercise'
        break
      case 5:
        output = 'Athlete'
        break
      default:
        break
    }
    return output
  }

  const radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 }
  ]

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={globalStyles.container}>
          <Formik initialValues={{
            height: userData.height || '',
            weight: userData.weight || '',
            age: userData.age || '',
            fat: (userData.fat).toString() || '',
            sex: userData.sex || 'Male',
            lifeActivity: userData.lifeActivity || 0,
          }}
            validationSchema={validationSchema}
            onSubmit={values => {
              setData({
                ...values,
                lifeActivity: stars,
                sex: option === 0 ? 'Male' : 'Female'
              })

              setDailyWeight({
                date: new Date().toISOString().slice(0, 10),
                weight: values.weight
              })

              navigation.navigate('Home')
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
              <View style={{ ...globalStyles.container, paddingVertical: 0 }} >
                <Text style={globalStyles.header}>Add your personal data</Text>
                <View>
                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon icon={faArrowsAltV} color={Colors.primary} size={36} />
                    </View>
                    <TextInput style={styles.input}
                      onChangeText={handleChange('height')}
                      onBlur={handleBlur('height')}
                      value={values.height}
                      placeholder="Height (cm)"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.errorText}>{touched.height && errors.height}</Text>

                  <View style={styles.inputContainer}>
                    <View>
                      <FontAwesomeIcon icon={faWeight} color={Colors.primary} size={36} />
                    </View>
                    <TextInput style={styles.input}
                      onChangeText={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                      value={values.weight}
                      placeholder="Weight (cm)"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.errorText}>{touched.weight && errors.weight}</Text>

                  <View style={styles.inputContainer}>
                    <View >
                      <FontAwesomeIcon icon={faBirthdayCake} color={Colors.primary} size={36} />
                    </View>
                    <TextInput style={styles.input}
                      onChangeText={handleChange('age')}
                      onBlur={handleBlur('age')}
                      value={values.age}
                      placeholder="Age"
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.errorText}>{touched.age && errors.age}</Text>

                  <View style={styles.inputContainer}>
                    <View >
                      <FontAwesomeIcon icon={faPercentage} color={Colors.primary} size={36} />
                    </View>
                    <TextInput style={{ ...styles.input, width: 80, marginRight: -30 }}
                      onChangeText={handleChange('fat')}
                      onBlur={handleBlur('fat')}
                      value={values.fat}
                      placeholder="Fat %"
                      keyboardType="numeric"
                    />
                    <BodyFatInfo navigation={navigation} />
                  </View>
                  <Text style={styles.errorText}>{touched.fat && errors.fat}</Text>

                  <View style={styles.inputContainer}>
                    <RadioForm
                      formHorizontal={true}
                      animation={true}
                    >
                      {
                        radio_props.map((obj, i) => (
                          <RadioButton labelHorizontal={true} key={i} >
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={option === i}
                              onPress={value => setOption(value)}
                              borderWidth={3}
                              buttonInnerColor={Colors.primary}
                              buttonOuterColor={option === i ? Colors.primary : Colors.primary}
                              buttonSize={10}
                              buttonOuterSize={20}
                              buttonStyle={{}}
                              buttonWrapStyle={{ marginLeft: 25 }}
                            />
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              onPress={value => setOption(value)}
                              labelStyle={{ fontSize: 20, paddingVertical: 2 }}
                              labelWrapStyle={{}}
                            />
                          </RadioButton>
                        ))
                      }
                    </RadioForm>
                  </View>

                  <View style={styles.stars} >
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
                      selectedStar={(rating) => setStars(rating)}
                    />
                  </View>
                </View>

                <View style={styles.button}>
                  <Button title="submit" color={Colors.primary} onPress={handleSubmit} />
                </View>

              </View>
            )}
          </Formik>
        </View >
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
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
    maxWidth: 120,
    padding: 10
  },
  stars: {
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15
  },
  lifeActivityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lifeActivity: {
    flexDirection: 'row',
    fontSize: 17,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
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
  setData: data => dispatch(setData(data)),
  setDailyWeight: data => dispatch(setDailyWeight(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData)