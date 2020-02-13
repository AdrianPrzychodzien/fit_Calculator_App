import React from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'
import { MifflinStJeor, HarrisBenedict, KatchMcardle } from '../../utils/equations'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const Statistics = ({ userData }) => {

  const { height, weight, age, sex, lifeActivity, fat, formula } = userData

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>Some statistics...</Text>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({

})


const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Statistics)