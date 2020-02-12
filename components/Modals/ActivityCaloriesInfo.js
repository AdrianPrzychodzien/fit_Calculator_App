import React, { useState } from 'react'

import { View, Text, StyleSheet, Modal, ScrollView, Button } from 'react-native'
import { activityLevel, restingMifflinStJeor } from '../../utils/equations'

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const ActivityCaloriesInfo = ({ userData, style }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [table, setTable] = useState({
    tableHead: ['Activity level', 'Kcal per day'],
    widthArr: [190, 120]
  })

  const { tableHead, widthArr } = table
  const { lifeActivity } = userData
  const kcalPerDay = (num) => {
    return Math.round(restingMifflinStJeor(userData) * activityLevel(num))
  }

  const userActivity = (data, num) => data === num && true

  const tableData = [
    ['Basal Metabolic Rate', `${restingMifflinStJeor(userData)}}`],
    ['Sedentary', `${kcalPerDay(1)}`],
    ['Light Exercise', `${kcalPerDay(2)}`],
    ['Moderate Exercise', `${kcalPerDay(3)}`],
    ['Heavy Exercise', `${kcalPerDay(4)}`],
    ['Athlete', `${kcalPerDay(5)}`]
  ]

  return (
    <>
      <Modal visible={modalOpen} animationType='slide'>
        <View style={globalStyles.container}>
          <View style={styles.modalCloseIcon}>
            <FontAwesomeIcon
              onPress={() => setModalOpen(false)}
              icon={faTimes}
              color={Colors.secondary}
              size={36}
            />
          </View>
          <Text style={globalStyles.header}>Calories intake</Text>
          <View style={styles.container}>
            <ScrollView horizontal={true}>
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
                          textStyle={[styles.text, userActivity(lifeActivity, index) && { fontWeight: 'bold' }]}
                        />
                      ))
                    }
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={style}>
        <Button
          onPress={() => setModalOpen(true)}
          color={Colors.primary}
          title="Calories intake on different activity level"
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  modalCloseIcon: { marginVertical: 20 },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 60, backgroundColor: Colors.primary },
  text: { textAlign: 'center', fontWeight: '400', fontSize: 17 },
  dataWrapper: { marginTop: -1 },
  row: { height: 45, backgroundColor: '#E7E6E1' }
})

export default ActivityCaloriesInfo