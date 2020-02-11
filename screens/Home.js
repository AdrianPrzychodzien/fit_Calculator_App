import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'
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
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Home page</Text>
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
                <RadioButtons style={globalStyles.radio}
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
          <View >
            <Text style={styles.info}>Body fat percentage is required</Text>
            <Button color={Colors.secondary}
              title="Click here to complete"
            />
          </View>
        )}

        {/* Information about user based on data from inputs */}
        <View style={styles.userInfo}>

          <View style={globalStyles.infoContainer}>
            <Text style={styles.info}>
              Resting Metabolic Age:
          </Text>
            <Text style={styles.data}>
              {sex && weight && height && age & lifeActivity
                && formula === 'MifflinStJeor' ? restingMifflinStJeor(userData) : null
                  || formula === 'HarrisBenedict' ? restingHarrisBenedict(userData) : null
                    || formula === 'KatchMcardle' ? (fat ? restingKatchMcardle(userData) : 'no data') : null
              }
              {fat ? ' kcal' : null}
            </Text>
          </View>

          <View style={globalStyles.infoContainer}>
            <Text style={styles.info}>
              Caloric needs:
          </Text>
            <Text style={styles.data}>
              {sex && weight && height && age & lifeActivity
                && formula === 'MifflinStJeor' ? MifflinStJeor(userData) : null
                  || formula === 'HarrisBenedict' ? HarrisBenedict(userData) : null
                    || formula === 'KatchMcardle' ? (fat ? KatchMcardle(userData) : 'no data') : null
              }
              {fat ? 'kcal' : null}
            </Text>
          </View>

          <View style={globalStyles.infoContainer}>
            <Text style={styles.info}>
              Body mass index:
            </Text>
            <Text style={styles.data}>
              {weight && height && calcBMI(userData)}
            </Text>
          </View>

          <View style={globalStyles.infoContainer}>
            <Text style={styles.info}>
              Maximum Heart Rates:
            </Text>
            <Text style={styles.data}>
              {age && maxHeartRate(userData)}
            </Text>
          </View>

          <View style={globalStyles.infoContainer}>
            <Text style={styles.info}>
              Training Heart Rate:
            </Text>
            <Text style={styles.data}>
              {age && trainingMin + '-' + trainingMax}
            </Text>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  userInfo: {
    paddingVertical: 15,
    width: '80%',
  },
  info: {
    fontSize: 18
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