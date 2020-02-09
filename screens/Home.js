import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native'

import Colors from '../utils/Colors'
import { RadioButtons } from 'react-native-radio-buttons'
import { setFormula } from '../redux/actions'
import { Formik } from 'formik'

import {
  activityLevelComment,
  calcBMI,
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle,
  restingMifflinStJeor,
  restingHarrisBenedict,
  restingKatchMcardle,
  trainingHeartRate,
  maxHeartRate
} from '../utils/equations'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBed,
  faUtensils,
  faBalanceScaleRight,
  faRunning,
  faHeartbeat,
  faCheck,
  faFemale
} from '@fortawesome/free-solid-svg-icons'

const Home = ({ userData, setFormula, navigation }) => {
  const [option, setOption] = useState('')

  const { weight, height, age, sex, lifeActivity, fat, formula } = userData
  const [trainingMin, trainingMax] = trainingHeartRate(maxHeartRate(userData))
  console.log(option)

  function renderOption(option, selected, onSelect, index) {
    const style = selected ? { fontWeight: 'bold', textDecorationLine: 'underline' } : {}

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={{ ...style, fontSize: 16 }}>{option}</Text>
      </TouchableWithoutFeedback >
    )
  }

  function renderContainer(optionNodes) {
    return <View>{optionNodes}</View>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello</Text>
      <View>
        {(weight && height && age && sex && lifeActivity) ? (
          <Text style={styles.description}>
            You are a {age} year old {sex} who is {height} tall and
            weights {weight} kg while {activityLevelComment(lifeActivity)}
          </Text>
        ) : (
            <>
              <Text style={styles.description}>
                Add your personal data and choose one of the following
                  three equations to calculate basic indicators
                  (Resting Metabolic Rate, Body Mass Index,
                      Training Heart Rate or Heart Rate Max)
              </Text>
              <View style={styles.button}>
                <Button title="Add personal data"
                  onPress={() => navigation.navigate('PersonalData')}
                />
              </View>
            </>
          )}
      </View>

      <Formik initialValues={{
        formula: userData.formula || ''
      }}
        onSubmit={values => {
          setFormula({
            formula: option
          })
        }}
      >
        {({ handleSubmit }) => (
          <>
            <View style={styles.inputContainer}>
              <RadioButtons style={styles.radio}
                options={['MifflinStJeor']}
                onSelection={() => setOption('MifflinStJeor')}
                selectedOption={option}
                renderOption={renderOption}
                renderContainer={renderContainer}
              />

              <RadioButtons style={styles.radio}
                options={['HarrisBenedict']}
                onSelection={() => setOption('HarrisBenedict')}
                selectedOption={option}
                renderOption={renderOption}
                renderContainer={renderContainer}
              />

              <RadioButtons style={styles.radio}
                options={['KatchMcardle']}
                onSelection={() => setOption('KatchMcardle')}
                selectedOption={option}
                renderOption={renderOption}
                renderContainer={renderContainer}
              />

            </View>
            <View style={styles.button}>
              <Button title="Calculate"
                type="submit"
                color={Colors.primary}
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>

      {formula === 'KatchMcardle' && !fat && (
        <Text>
          Body fat percentage is required
            <Button color={Colors.secondary}
            onPress={navigation.navigator('BodyFat')}
            title="Click here to complete"
          />

        </Text>
      )}

      <View style={styles.userInfo}>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Resting Metabolic Age:
          </Text>
          <Text style={styles.data}>
            {formula === 'MifflinStJeor' ?
              restingMifflinStJeor(userData) : (formula === 'HarrisBenedict' ?
                restingHarrisBenedict(userData) : (
                  fat ? restingKatchMcardle(userData) :
                    ('no data')))}
            {fat ? ' kcal' : null}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Caloric needs:
          </Text>
          <Text style={styles.data}>
            {formula === 'MifflinStJeor' ?
              MifflinStJeor(userData) : (formula === 'HarrisBenedict' ?
                HarrisBenedict(userData) : (
                  fat ? KatchMcardle(userData) :
                    ('no data')))}
            {fat ? 'kcal' : null}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Body mass index:
          </Text>
          <Text style={styles.data}>
            {calcBMI(userData)}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Maximum Heart Rates:
          </Text>
          <Text style={styles.data}>
            {maxHeartRate(userData)}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            Training Heart Rate:
          </Text>
          <Text style={styles.data}>
            {trainingMin} - {trainingMax}
          </Text>
        </View>

      </View>
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
  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    paddingVertical: 10
  },
  button: {
    paddingVertical: 15
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  radio: {
    flexDirection: 'row',
    padding: 5
  },
  userInfo: {
    paddingVertical: 15,
    width: '80%',
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  info: {
    fontSize: 16
  },
  data: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

const mapStateToProps = ({ data }) => ({
  userData: data,
})

const mapDispatchToProps = dispatch => ({
  setFormula: data => dispatch(setFormula(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)