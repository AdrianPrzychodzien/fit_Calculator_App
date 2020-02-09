import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const WieghtTracker = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>WEIGHT TRACKER PAGE</Text>
      <Button title="Go to pesonal Data"
        onPress={() => navigation.navigate('PersonalData')} />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default WieghtTracker