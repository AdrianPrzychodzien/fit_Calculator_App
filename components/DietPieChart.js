import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

import { globalStyles } from '../utils/globalStyles'

const DietPieChart = ({ diet }) => {

  const displayPieChart = diet => {
    let _data = []
    let macro = ['Protein', 'Carbs', 'Fats']
    let colors = ['blue', 'red', 'green']
    let perc

    switch (diet) {
      case 'Medium Carb':
        for (let i = 0; i < macro.length; i++) {
          perc = [20, 35, 35]
          _data.push({
            name: macro[i],
            percentage: perc[i],
            color: colors[i],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          })
        }
        break
      case 'Low Carb':
        for (let i = 0; i < macro.length; i++) {
          perc = [40, 20, 40]
          _data.push({
            name: macro[i],
            percentage: perc[i],
            color: colors[i],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          })
        }
        break
      case 'High Carb':
        for (let i = 0; i < macro.length; i++) {
          perc = [30, 50, 20]
          _data.push({
            name: macro[i],
            percentage: perc[i],
            color: colors[i],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
          })
        }
        break
      default:
        break
    }
    return _data
  }

  let data = displayPieChart(diet)

  return (
    <View style={globalStyles.container}>
      <View>
        <Text style={styles.tableHeader}>Distribution of macronutrients</Text>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 50}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            barPercentage: 0.5
          }}
          accessor="percentage"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tableHeader: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  }
})

export default DietPieChart