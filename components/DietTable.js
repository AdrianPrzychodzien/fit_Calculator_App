import React from 'react'

import { ModerateCarb, LowCarb, HighCarb } from '../utils/equations'

import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { Table, Row } from 'react-native-table-component'

import { globalStyles } from '../utils/globalStyles'

const DietTable = ({ diet, kcalAmount }) => {

  const ModerateCarbDiet = [
    ModerateCarb(kcalAmount)[0],
    ModerateCarb(kcalAmount)[1],
    ModerateCarb(kcalAmount)[2]
  ]
  const LowCarbDiet = [
    LowCarb(kcalAmount)[0],
    LowCarb(kcalAmount)[1],
    LowCarb(kcalAmount)[2]
  ]
  const HighCarbDiet = [
    HighCarb(kcalAmount)[0],
    HighCarb(kcalAmount)[1],
    HighCarb(kcalAmount)[2]
  ]

  const macro = ['Protein (g)', 'Carbs (g)', 'Fats (g)']

  let tableData = []

  switch (diet) {
    case 'Medium Carb':
      tableData = [
        macro,
        [ModerateCarbDiet[0], ModerateCarbDiet[1], ModerateCarbDiet[2]]
      ]
      break
    case 'Low Carb':
      tableData = [
        macro,
        [LowCarbDiet[0], LowCarbDiet[1], LowCarbDiet[2]]
      ]
      break
    case 'High Carb':
      tableData = [
        macro,
        [HighCarbDiet[0], HighCarbDiet[1], HighCarbDiet[2]]
      ]
      break
    default:
      break
  }

  return (
    <View style={globalStyles.container}>
      <View>
        <Text style={styles.tableHeader}>
          These macronutrient values reflect your maintenance calories
          of {kcalAmount} kcal per day.
      </Text>
        <Table>
          <Row widthArr={[120, 120, 120]} style={styles.header} textStyle={styles.text} />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table>
            {
              tableData.map((colData, index) => {
                return (
                  <Row
                    key={index}
                    data={colData}
                    widthArr={[120, 120, 120]}
                    style={[styles.col]}
                    textStyle={[styles.text]}
                  />
                )
              })
            }
          </Table>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: { fontSize: 20, textAlign: 'center', fontWeight: 'bold' },
  tableHeader: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }
})

export default DietTable