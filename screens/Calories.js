import React from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'
import { MifflinStJeor, HarrisBenedict, KatchMcardle } from '../utils/equations'
import ActivityCaloriesInfo from '../components/Modals/ActivityCaloriesInfo'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'

const Calories = ({ userData, navigation }) => {

  const { height, weight, age, sex, lifeActivity, fat, formula } = userData

  const formulaOption = formula === 'MifflinStJeor' ?
    MifflinStJeor(userData) : formula === 'HarrisBenedict' ?
      HarrisBenedict(userData) : KatchMcardle(userData)

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <Text>CALORIES PAGE</Text>
          <ActivityCaloriesInfo userData={userData} />
        </View>
      </ScrollView >
    )
  } else {
    return (
      <View style={globalStyles.container}>
        <View style={{ width: '80%' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 15 }} >Complete informations about yourself first</Text>
          <Button title="go to personal data page"
            color={Colors.secondary}
            onPress={() => navigation.navigate('PersonalData')}
          />
        </View>
      </View >
    )
  }

}

const styles = StyleSheet.create({
  info: {
    fontSize: 20
  },
  data: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 30,
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    paddingVertical: 10
  }
})


const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Calories)