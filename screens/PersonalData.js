import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { View, Text, StyleSheet, Button, TextInput, TouchableWithoutFeedback } from 'react-native'

import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { setData, setDailyWeight } from '../redux/actions'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faBirthdayCake, faArrowsAltV, faFemale,
  faMale, faWeight, faPercentage, faCoffee
} from '@fortawesome/free-solid-svg-icons'

import { RadioButtons } from 'react-native-radio-buttons'

const validationSchema = yup.object({
  height: yup.number('It must be a number').required('Height is required').positive(),
  weight: yup.number('It must be a number').required('Weight is required').positive(),
  age: yup.number('It must be a number').required('Age is required').positive(),
  fat: yup.number('It must be a number').positive().max(70, 'Are you sure?')
})

const PersonalData = ({ userData, setData, setDailyWeight, navigation }) => {
  const [selectedOption, setSelectedOption] = useState('')
  console.log(selectedOption)

  function renderOption(option, selected, onSelect, index) {
    const style = selected ? { fontWeight: 'bold' } : {};

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableWithoutFeedback>
    );
  }

  function renderContainer(optionNodes) {
    return <View>{optionNodes}</View>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Formik initialValues={{
        height: userData.height || '',
        weight: userData.weight || '',
        age: userData.age || '',
        fat: userData.fat || userData.fat || '',
        sex: userData.sex || 'Male',
        lifeActivity: userData.lifeActivity || 1,
      }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values)
          setvalues({
            ...values,
          })

          setDailyWeight({
            date: new Date().toISOString().slice(0, 10),
            weight: values.weight
          })

          navigation.navigate('Home')
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values }) => (
          <View style={styles.container}>
            <Text style={styles.header}>Add your personal data</Text>
            <View>
              <View style={styles.inputContainer}>
                <View>
                  <FontAwesomeIcon icon={faArrowsAltV} size={36} />
                </View>
                <TextInput style={styles.input}
                  onChangeText={handleChange('height')}
                  onBlur={handleBlur('height')}
                  value={values.height}
                  placeholder="Height (cm)"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <View>
                  <FontAwesomeIcon icon={faWeight} size={36} />
                </View>
                <TextInput style={styles.input}
                  onChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  value={values.weight}
                  placeholder="Weight (cm)"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <View >
                  <FontAwesomeIcon icon={faBirthdayCake} size={36} />
                </View>
                <TextInput style={styles.input}
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                  placeholder="Age"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <View >
                  <FontAwesomeIcon icon={faPercentage} size={36} />
                </View>
                <TextInput style={styles.input}
                  onChangeText={handleChange('fat')}
                  onBlur={handleBlur('fat')}
                  value={values.fat}
                  placeholder="Fat %"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <View >
                  <FontAwesomeIcon icon={faFemale} size={36} />
                </View>
                <RadioButtons style={styles.radio}
                  options={['Male']}
                  onSelection={() => setSelectedOption('Male')}
                  selectedOption={selectedOption}
                  renderOption={renderOption}
                  renderContainer={renderContainer}
                />
                <RadioButtons style={styles.radio}
                  options={['Female']}
                  onSelection={() => setSelectedOption('Female')}
                  selectedOption={selectedOption}
                  renderOption={renderOption}
                  renderContainer={renderContainer}
                />
              </View>

              <Button title="submit" color="maroon" onPress={handleSubmit} />

            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  inputContainer: {
    flexDirection: 'row',
    width: '60%',
    marginHorizontal: 15,
    paddingVertical: 10,
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
  radio: {
    flexDirection: 'row',
    padding: 15
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