import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import {
  rangeBMIColor, loseOrGain, getActualWeekDates,
  displayAverageWeight, myDateFormat
} from '../../utils/equations'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowUp, faArrowDown, faEquals } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const History = ({ userData }) => {
  const [table, setTable] = useState({
    tableHead: ['Date', 'Weight', 'BMI', 'Trend'],
    widthArr: [80, 80, 80, 80]
  })

  const { dailyWeightArray, height, start, finish } = userData
  const [thisWeekAvg, lastWeekAvg, beforeLastWeekAvg] = displayAverageWeight(dailyWeightArray, getActualWeekDates)
  const { tableHead, widthArr } = table

  let tableData = []
  dailyWeightArray.slice(0).reverse().map((item, index) => {
    const itemBMI = (item.weight / ((height / 100) * (height / 100))).toFixed(2)

    let el = dailyWeightArray.slice(0).reverse()

    const icon = (index + 1) < dailyWeightArray.length && (
      item.weight - el[index + 1].weight > 0
        ? 'faArrowUp' : item.weight - el[index + 1].weight < 0
          ? 'faArrowDown' : 'faEquals'
    )

    let row = []
    row = Object.values(item)
    row.push(itemBMI, icon)
    tableData.push(row)
  })
  console.log(tableData)

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text>Check your weight log</Text>
        <View style={styles.container}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </View>

      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({

})


const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(History)