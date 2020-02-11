import React from 'react'
import { calcBMI } from '../utils/equations'
import { View, StyleSheet } from 'react-native'

// import Slider from '@react-native-community/slider'


const InputRange = ({ userData }) => (
  <View>
    <Slider
      style={{ width: 200, height: 40 }}
      value={calcBMI(userData)}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
    />
  </View>
)

const styles = StyleSheet.create({

})

export default InputRange