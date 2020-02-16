import React from 'react'

import { PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

const DietPieChart = ({ diet }) => {

  const displayPieChart = diet => {
    let _data = []
    let macro = ['Protein', 'Carbs', 'Fats']
    let colors = ['blue', 'red', 'green']
    let perc

    switch (diet) {
      case 'Medium Carb':
        for (let i = 0; i < macro.length; i++) {
          perc = [.3, .35, .35]
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
          perc = [.4, .2, .4]
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
          perc = [.3, .5, .2]
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
  )
}

export default DietPieChart