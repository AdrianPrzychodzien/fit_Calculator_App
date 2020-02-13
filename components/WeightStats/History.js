import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import { rangeBMIColor, getActualWeekDates, displayAverageWeight } from '../../utils/equations'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowUp, faArrowDown, faEquals } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const History = ({ userData }) => {
  const [table, setTable] = useState({
    tableHead: ['Date', 'Weight', 'BMI', 'Trend'],
    widthArr: [110, 60, 80, 60]
  })

  const { dailyWeightArray, height } = userData
  const { tableHead, widthArr } = table

  let tableData = []
  dailyWeightArray.slice(0).reverse().map((item, index) => {
    const itemBMI = (item.weight / ((height / 100) * (height / 100))).toFixed(2)

    let el = dailyWeightArray.slice(0).reverse()

    const fontIcon = (color, fa) => (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <FontAwesomeIcon style={{ color: color }} icon={fa} />
      </View>
    )

    const icon = (index + 1) < dailyWeightArray.length && (
      item.weight - el[index + 1].weight > 0
        ? fontIcon('red', faArrowUp)
        : item.weight - el[index + 1].weight < 0
          ? fontIcon('green', faArrowDown)
          : fontIcon('blue', faEquals)
    )

    let row = []
    row = Object.values(item)
    row.push(itemBMI, icon)
    tableData.push(row)
  })

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Check your weight log</Text>

        {/* Table with weight history logs */}
        <View style={globalStyles.container}>
          <View>
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
                        textStyle={[styles.text, { color: rangeBMIColor(rowData[2]) },]}
                      />
                    )
                  })
                }
              </Table>
            </ScrollView>
          </View>
        </View>

        {/* Legend */}
        <Text style={styles.subHeader}>Legend</Text>
        <View style={styles.legend}>
          <View style={styles.colors}>
            <Text style={styles.title}>Colors</Text>
            <View style={styles.container}>
              <Text style={{ ...styles.color, color: 'purple' }}>Purple color:</Text>
              <Text>Severe Thinness</Text>
            </View>

            <View style={styles.container}>
              <Text style={{ ...styles.color, color: 'blue' }}>Blue color:</Text>
              <Text>Moderate Thinness</Text>
            </View>

            <View style={styles.container}>
              <Text style={{ ...styles.color, color: 'lightblue' }}>Light blue color:</Text>
              <Text>Mild Thinness</Text>
            </View>

            <View style={styles.container}>
              <Text style={{ ...styles.color, color: 'green' }}>Green color:</Text>
              <Text>Normal weight</Text>
            </View>

            <View style={styles.container}>
              <Text style={{ ...styles.color, color: 'orange' }}>Orange color:</Text>
              <Text>Overweight</Text>
            </View>

            <View style={styles.container}>
              <Text style={{ ...styles.color, color: 'red' }}>Red color:</Text>
              <Text>Obese</Text>
            </View>
          </View>

          <View style={styles.arrows}>
            <Text style={styles.title}>Arrows</Text>
            <View style={styles.container}>
              <FontAwesomeIcon style={{ color: 'green' }} icon={faArrowDown} />
              <Text>Weight decrease</Text>
            </View>

            <View style={styles.container}>
              <FontAwesomeIcon style={{ color: 'red' }} icon={faArrowUp} />
              <Text>Weight increase</Text>
            </View>

            <View style={styles.container}>
              <FontAwesomeIcon style={{ color: 'blue' }} icon={faEquals} />
              <Text>Maintenance</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  header: { height: 50, backgroundColor: Colors.primary },
  text: { textAlign: 'center', fontWeight: '700' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  legend: { flexDirection: 'row' },
  colors: { width: '60%' },
  arrows: { width: '40%' },
  title: { fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginVertical: 10 },
  container: { flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 3 },
  subHeader: { fontSize: 26, fontWeight: 'bold', marginVertical: 10 },
  color: { fontWeight: 'bold', paddingRight: 15 }
})

const mapStateToProps = ({ data }) => ({
  userData: data
})

export default connect(mapStateToProps, null)(History)