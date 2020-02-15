import React from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'
import { healthyProgress, myDateFormat } from '../../utils/equations'

import WeightTrackerInfo from '../Modals/WeightTrackerInfo'

import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const Chart = ({ userData, navigation }) => {
  const { dailyWeightArray, weightGoal, height, start, finish } = userData

  const healthy = healthyProgress(userData)

  let healthyArr = healthy.map(item => {
    return {
      day: item.date.slice(5, 10),
      healthy: item.weight
    }
  })

  // Can add healthy property to specific object?? 
  const calcHealthyProperty = item => {
    let output
    for (let i = 0; i < healthyArr.length; i++) {
      if (healthyArr[i].day === item.date.slice(5, 10)) {
        output = healthyArr[i].healthy
      }
    }
    return output
  }

  let dailyWeights = dailyWeightArray.map(item => {
    return {
      day: item.date.slice(5, 10),
      weight: item.weight,
      goal: weightGoal,
      ...(calcHealthyProperty(item) && { healthy: calcHealthyProperty(item) })
    }
  })

  const data = [...dailyWeights]

  const labels = []
  const weights = []
  const goalData = []
  const healthyData = []
  data.slice(0).map((item) => {
    labels.push(item.day)
    weights.push(item.weight)
    goalData.push(item.goal)
    item.healthy && healthyData.push(item.healthy)
  })

  if (dailyWeightArray.length, weightGoal, start, finish) {
    return (
      <>
        <ScrollView>
          <View style={globalStyles.container}>
            <Text style={{ ...globalStyles.header, fontSize: 20 }}>
              Start day was on {myDateFormat(start)}
            </Text>
            <Text style={{ ...globalStyles.header, fontSize: 20 }}>
              Finish will be on {myDateFormat(finish)}
            </Text>

            {/* Chart with actual weight */}
            <Text style={styles.chartTitle}>Actual weight change</Text>
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: weights,
                    color: () => `red`
                  },
                  { data: goalData }
                ],
                legend: ['actual weight', 'goal']
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix="kg"
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "#E5E8E8",
                backgroundGradientTo: "white",
                decimalPlaces: 0,
                color: () => `black`,
                labelColor: () => `black`,
                style: { borderRadius: 16 },
                propsForDots: {
                  strokeWidth: "5",
                  stroke: "black"
                }
              }}
              bezier
              withDots={false}
              style={{
                marginVertical: 24,
                borderRadius: 16
              }}
            />

            {/* Chart with healthy pace of changing weight */}
            {dailyWeightArray.length > 1 ? (
              <>
                <Text style={styles.chartTitle}>Healthy weight change</Text>
                <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: weights,
                        color: () => `green`
                      },
                      { data: healthyData }
                    ],
                    legend: ['actual weight', 'healthy line']
                  }}
                  width={Dimensions.get("window").width} // from react-native
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix="kg"
                  chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "#E5E8E8",
                    backgroundGradientTo: "white",
                    decimalPlaces: 0,
                    color: () => `black`,
                    labelColor: () => `black`,
                    style: { borderRadius: 16 },
                    propsForDots: {
                      strokeWidth: "5",
                      stroke: "black"
                    }
                  }}
                  bezier
                  withDots={false}
                  style={{
                    marginVertical: 24,
                    borderRadius: 16
                  }}
                />
              </>
            ) : (
                <Text style={styles.chartTitle}>
                  Chart with healthy pace of weight change
                  will appear after second weight actualization
              </Text>
              )}

            <WeightTrackerInfo />
          </View>
        </ScrollView>
      </>
    )
  } else {
    return (
      <View style={globalStyles.container}>
        <View style={{ width: '80%' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 15 }} >
            Complete informations about your weight goal
            </Text>
          <Button title="go to weight tracker"
            color={Colors.secondary}
            onPress={() => navigation.navigate('Weight Statistics')}
          />
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  chartTitle: {
    textAlign: 'center', fontSize: 20, marginBottom: -20, marginTop: 20, fontWeight: 'bold'
  }
})

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Chart)