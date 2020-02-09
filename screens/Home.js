import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'


const Home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello</Text>
      <View>
        {!true ? (
          <Text style={styles.description}>
            You are a ... year old ... whi is ... tall and weights ... kg whie ...
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
  }

})

export default Home