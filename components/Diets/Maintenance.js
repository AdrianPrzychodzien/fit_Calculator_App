import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button, Picker } from 'react-native'
import {
  MifflinStJeor,
  HarrisBenedict,
  KatchMcardle,
  ModerateCarb,
  LowCarb,
  HighCarb
} from '../../utils/equations'
import ActivityCaloriesInfo from '../Modals/ActivityCaloriesInfo'

import { PieChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { Table, Row } from 'react-native-table-component'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'
import { array } from 'yup'

const Maintenance = ({ userData, navigation }) => {
  const [table, setTable] = useState({
    tableHead: ['Macro', 'Medium Carb', 'Low Carb', 'High Carb'],
    widthArr: [90, 90, 90, 90]
  })
  const [diet, setDiet] = useState('Medium Carb')

  const { tableHead, widthArr } = table
  const { height, weight, age, sex, lifeActivity, formula } = userData

  const formulaOption = formula === 'MifflinStJeor' ?
    MifflinStJeor(userData) : formula === 'HarrisBenedict' ?
      HarrisBenedict(userData) : KatchMcardle(userData)

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

  const displayPieChart = state => {
    let _data = []
    let macro = ['Protein', 'Carbs', 'Fats']
    let colors = ['blue', 'red', 'green']
    let perc

    switch (state) {
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

  if (height && weight && age && sex && lifeActivity) {
    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <Text style={globalStyles.header}>Caloric needs: {kcalAmount}kcal</Text>
          <ActivityCaloriesInfo userData={userData} style={{ marginTop: 20 }} />
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

        {/* Picker */}
        <View style={globalStyles.container}>
          <Text style={styles.tableHeader} >Choose diet</Text>
          <Picker
            selectedValue={diet}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setDiet(itemValue)
            }>
            <Picker.Item label="Medium Carb" value="Medium Carb" />
            <Picker.Item label="Low Carb" value="Low Carb" />
            <Picker.Item label="High Carb" value="High Carb" />
          </Picker>
        </View>

        {/* Pie chart */}
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

export default connect(mapStateToProps, null)(Maintenance)