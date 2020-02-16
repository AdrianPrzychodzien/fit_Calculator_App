import React, { useState } from 'react'

import { View, Text, StyleSheet, Modal, ScrollView, Button } from 'react-native'

import { Table, Row } from 'react-native-table-component'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Colors from '../../utils/Colors'
import { globalStyles } from '../../utils/globalStyles'

const FatPercentageInfo = ({ style }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const tableHead = ['Category', 'Women', 'Men']

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
                  <Row data={tableHead} widthArr={[120, 95, 95]} style={styles.header} textStyle={styles.text} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    {
                      tableData.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={[120, 95, 95]}
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
        <Button
          onPress={() => setModalOpen(true)}
          title="Fat percentage categories"
          color={Colors.primary}
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