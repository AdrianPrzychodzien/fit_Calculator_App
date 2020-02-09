import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HOME PAGE</Text>
      <Button title="Go to pesonal Data"
        onPress={() => navigation.navigate('PersonalData')} />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default Home