import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'
import {
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle,
  ModerateCarb,
  LowCarb,
  HighCarb
} from '../utils/equations'
import ActivityCaloriesInfo from '../components/Modals/ActivityCaloriesInfo'

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import Colors from '../utils/Colors'
import { globalStyles } from '../utils/globalStyles'

const Calories = ({ userData, navigation }) => {
  const [table, setTable] = useState({
    tableHead: ['Macro', 'Medium Carb', 'Low Carb', 'High Carb'],
    widthArr: [90, 90, 90, 90]
  })

  const { tableHead, widthArr } = table

  const { height, weight, age, sex, lifeActivity, fat, formula } = userData

  const formulaOption = formula === 'MifflinStJeor' ?
    MifflinStJeor(userData) : formula === 'HarrisBenedict' ?
      HarrisBenedict(userData) : KatchMcardle(userData)

  // const kcalAmount = activeTab === 'Maintenance' ?
  //   formulaOption : activeTab === 'Cutting' ?
  //     formulaOption - 500 : formulaOption + 500

  const kcalAmount = formulaOption

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
  for (let i = 0; i < macro.length; i++) {
    let row = []
    row.push(macro[i], ModerateCarbDiet[i], LowCarbDiet[i], HighCarbDiet[i])
    tableData.push(row)
  }

  if (height && weight && age && sex && lifeActivity && fat) {
    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <Text style={globalStyles.header}>Caloric needs: {formulaOption}kcal</Text>
          <ActivityCaloriesInfo userData={userData} />
        </View>

        {/* Table */}
        <View style={globalStyles.container}>
          <View>
            <Text style={styles.tableHeader}>
              These macronutrient values reflect your maintenance calories
              of {kcalAmount} kcal per day.
            </Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 0 }}>
                {
                  tableData.map((rowData, index) => {
                    return (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={[styles.text]}
                      />
                    )
                  })
                }
              </Table>
            </ScrollView>
          </View>
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
            onPress={() => navigation.navigate('Personal Data')}
          />
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  info: { fontSize: 20 },
  data: { fontSize: 18, fontWeight: 'bold', },
  description: { marginVertical: 30, textAlign: 'center', fontSize: 20 },
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    paddingVertical: 10
  },
  row: { paddingVertical: 12 },
  text: { fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  tableHeader: { textAlign: 'center', fontSize: 18, fontWeight: 'bold' }
})

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(Calories)