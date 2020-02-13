import React, { useState } from 'react'

import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native'

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const FatPercentageInfo = ({ style }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [table, setTable] = useState({
    tableHead: ['Category', 'Women', 'Men'],
    widthArr: [120, 95, 95]
  })

  const { tableHead, widthArr } = table
  const tableData = [
    ['Essential Fat', '10-13%', '2-5%'],
    ['Athletes', '14-20%', '6-13%'],
    ['Fitness', '21-24%', '14-17%'],
    ['Acceptable', '25-31%', '18-24%'],
    ['Obese', '32%+', '25%+']
  ]

  return (
    <>
      <Modal visible={modalOpen} animationType='slide'>
        <View style={globalStyles.container}>
          <View style={styles.modalCloseIcon}>
            <FontAwesomeIcon
              onPress={() => setModalOpen(false)}
              icon={faTimes}
              color={Colors.warning}
              size={36}
            />
          </View>
          <Text style={globalStyles.header}>Fat % Categories</Text>
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
                          textStyle={styles.text}
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
        <FontAwesomeIcon
          onPress={() => setModalOpen(true)}
          icon={faQuestionCircle}
          color={Colors.primary}
          size={30}
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

export default FatPercentageInfo