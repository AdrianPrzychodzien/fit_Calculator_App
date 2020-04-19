import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

// import { setFormula } from '../redux/actions'
import { setFormulaActionCreator } from '../redux-toolkit/redux-toolkit'
import { Formik } from 'formik'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'

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

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faBed,
  faUtensils,
  faBalanceScaleRight,
  faRunning,
  faHeartbeat,
} from '@fortawesome/free-solid-svg-icons'

const Home = ({ userData, setFormula, navigation }) => {
  const [option, setOption] = useState('')

  const { weight, height, age, sex, lifeActivity, fat, formula } = userData
  const [trainingMin, trainingMax] = trainingHeartRate(maxHeartRate(userData))

  const radio_props = [
    { label: 'MifflinStJeor', value: 0 },
    { label: 'HarrisBenedict', value: 1 },
    { label: 'KatchMcardle', value: 2 }
  ]

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
                    onPress={() => navigation.navigate('Personal Data')}
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
              formula: option === 0 ? 'MifflinStJeor'
                : option === 1 ? 'HarrisBenedict' : 'KatchMcardle'
            })
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Text style={styles.subHeader}>Which formula should be used for calculations?</Text>
              <View style={styles.inputContainer}>
                <RadioForm
                  formHorizontal={true}
                  animation={true}
                >
                  {
                    radio_props.map((obj, i) => (
                      <RadioButton labelHorizontal={false} key={i} >
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
                          buttonWrapStyle={{ marginLeft: 0 }}
                        />
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          labelHorizontal={true}
                          onPress={value => setOption(value)}
                          labelStyle={{ fontSize: 18, paddingVertical: 10 }}
                          labelWrapStyle={{}}
                        />
                      </RadioButton>
                    ))
                  }
                </RadioForm>
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
            <Button
              color={Colors.secondary}
              title="Click here to complete"
              onPress={() => navigation.navigate('Body Fat Percentage')}
            />
          </View>
        )}

        {/* Information about user based on data from inputs */}
        <View style={styles.userInfo}>

          <View style={globalStyles.infoContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <View style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faBed} color={Colors.primary} size={36} />
              </View>
              <Text style={styles.info}>
                Resting metabolic rate:
              </Text>
            </View>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <View style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faUtensils} color={Colors.primary} size={36} />
              </View>
              <Text style={styles.info}>
                Caloric needs:
              </Text>
            </View>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <View style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faBalanceScaleRight} color={Colors.primary} size={36} />
              </View>
              <Text style={styles.info}>
                Body mass index:
              </Text>
            </View>
            <Text style={styles.data}>
              {weight && height && calcBMI(userData)}
            </Text>
          </View>

          <View style={globalStyles.infoContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <View style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faHeartbeat} color={Colors.primary} size={36} />
              </View>
              <Text style={styles.info}>
                Maximum heart rates:
              </Text>
            </View>
            <Text style={styles.data}>
              {age && maxHeartRate(userData)}
            </Text>
          </View>

          <View style={globalStyles.infoContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <View style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faRunning} color={Colors.primary} size={36} />
              </View>
              <Text style={styles.info}>
                Training heart rates:
              </Text>
            </View>
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
  subHeader: { fontSize: 16, textAlign: 'center', marginTop: 15 },
  button: { paddingVertical: 10 },
  inputContainer: { paddingVertical: 10 },
  userInfo: { paddingVertical: 15, width: '90%' },
  info: { fontSize: 18 },
  data: { fontSize: 18, fontWeight: 'bold' }
})

const mapStateToProps = ({ data }) => ({
  userData: data,
})

const mapDispatchToProps = dispatch => ({
  setFormula: data => dispatch(setFormulaActionCreator(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)